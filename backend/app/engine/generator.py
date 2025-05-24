import asyncio
import random
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.answer import Answer

async def simulate_generation():
    while True:
        async with asyncio.Lock():
            db: Session = SessionLocal()
            pending_answers = db.query(Answer).filter(Answer.status == "pending").all()
            for answer in pending_answers:
                answer.status = "in_progress"
                db.commit()
                await asyncio.sleep(random.randint(5, 30))
                answer.status = "done"
                answer.answer_text = f"Generated answer for question {answer.question_id} and file {answer.file_id}"
                db.commit()
            db.close()
        await asyncio.sleep(10)  # Check again after some time

if __name__ == "__main__":
    asyncio.run(simulate_generation())
