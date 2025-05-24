from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.api.auth import get_current_user
from app.models.user import User
from app.services.answer_service import get_answer_text

router = APIRouter(prefix="/answer", tags=["answer"])

@router.get("")
def get_answer(question_id: int, file_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    text = get_answer_text(db, current_user, question_id, file_id)
    return {"text": text}