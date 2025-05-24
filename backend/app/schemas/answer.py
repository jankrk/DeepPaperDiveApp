from pydantic import BaseModel
from typing import Optional

class AnswerOut(BaseModel):
    text: Optional[str]
