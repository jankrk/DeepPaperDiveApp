from pydantic import BaseModel
from typing import Optional

class AnswerOut(BaseModel):
    answer_text: Optional[str]
    status: str

