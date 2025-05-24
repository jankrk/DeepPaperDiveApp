from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class JobOut(BaseModel):
    id: int
    name: str

    class Config:
        from_attributes = True


class JobDetail(BaseModel):
    id: int
    name: str
    questions: List[str]
    filenames: List[str]