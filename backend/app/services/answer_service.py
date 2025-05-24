from sqlalchemy.orm import Session
from app.models.answer import Answer
from app.models.user import User
from app.models.job import Job


def get_answer_text(db: Session, user: User, question_id: int, file_id: int) -> str:
    answer = db.query(Answer).join(Job).filter(
        Answer.question_id == question_id,
        Answer.file_id == file_id,
        Job.user_id == user.id
    ).first()

    if not answer:
        return "brak odpowiedzi"

    if answer.status == "done" and answer.answer_text:
        return answer.answer_text

    return "brak odpowiedzi"