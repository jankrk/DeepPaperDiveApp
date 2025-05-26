from app.core.celery_app import celery_app
from database.database import SessionLocal
from database.models import Job, Answer
import time

@celery_app.task(name="app.tasks.process_job.process_job")
def process_job(job_id: int):
    print(f"Processing job {job_id}")
    db = SessionLocal()
    job = db.query(Job).filter(Job.id == job_id).first()
    if not job:
        return f"Job {job_id} not found"

    job.status = "processing"
    db.commit()

    answers = db.query(Answer).filter(Answer.job_id == job_id).all()
    for answer in answers:
        time.sleep(3)  # symulacja
        answer.status = "done"
        answer.answer_text = "Przetworzono"
        db.commit()
    job.status = "done"
    db.commit()
    db.close()
    return f"Processed job {job_id}"
