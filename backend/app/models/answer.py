from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base

class Answer(Base):
    __tablename__ = "answers"

    id = Column(Integer, primary_key=True, index=True)
    job_id = Column(Integer, ForeignKey("jobs.id"))
    file_id = Column(Integer, ForeignKey("files.id"))
    question_id = Column(Integer, ForeignKey("questions.id"))
    status = Column(String, default="pending")  # pending, in_progress, done, error
    answer_text = Column(Text, nullable=True)
    answer_encoded = Column(Text, default="")
    answer_contexts = Column(Text, default="")
    answer_conversation = Column(Text, default="")

    job = relationship("Job")
    file = relationship("File")
    question = relationship("Question")
