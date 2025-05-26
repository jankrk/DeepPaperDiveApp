from sqlalchemy.orm import Session
from database.models.answer import Answer
from database.models.user import User
from database.models.job import Job


def get_answer_text(db: Session, user: User, answer_id: int):
    answer = db.query(Answer).join(Job).filter(
        Answer.id == answer_id,
        Job.user_id == user.id
    ).first()

    if not answer:
        return {
            "answer_text": "db error", 
            "status": "error"
        }

    if answer.status == "done" and answer.answer_text:
        return {
            "answer_text": answer.answer_text, 
            "status": answer.status
        }
    

    return {
            "answer_text": "", 
            "status": answer.status
        }