from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.api.auth import get_current_user
from app.models.user import User
from app.schemas.answer import AnswerOut
from app.services.answer_service import get_answer_text

router = APIRouter()

@router.get("/{answer_id}", response_model=AnswerOut)
def get_answer(answer_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    a =  get_answer_text(db, current_user, answer_id)
    print(a)
    return a