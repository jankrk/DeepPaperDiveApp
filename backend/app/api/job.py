import os
import shutil
from fastapi import APIRouter, UploadFile, File, Form, Depends
from typing import List
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import job as job_model, file as file_model, question as question_model
from app.models.user import User  # jeśli masz Depends(get_current_user), dodaj je później

UPLOAD_DIR = "uploaded_files"
os.makedirs(UPLOAD_DIR, exist_ok=True)

router = APIRouter()

@router.post("/submit", status_code=201)
async def submit_job(
    questions: List[str] = Form(...),
    files: List[UploadFile] = File(...),
    db: Session = Depends(get_db)
):
    # Step 1: Create the Job entry
    job = job_model.Job(status="pending")
    db.add(job)
    db.commit()
    db.refresh(job)

    # Step 2: Save files and create File entries
    for uploaded_file in files:
        filepath = os.path.join(UPLOAD_DIR, uploaded_file.filename)
        with open(filepath, "wb") as buffer:
            shutil.copyfileobj(uploaded_file.file, buffer)

        file_record = file_model.File(
            filename=uploaded_file.filename,
            filepath=filepath,
            job_id=job.id,
        )
        db.add(file_record)

    # Step 3: Save questions
    for text in questions:
        question = question_model.Question(
            text=text,
            job_id=job.id
        )
        db.add(question)

    db.commit()

    return {"job_id": job.id, "message": "Job submitted successfully"}
