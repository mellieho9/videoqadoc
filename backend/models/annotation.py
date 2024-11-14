from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel

class Annotation(BaseModel):
    id: str
    created_at: datetime = datetime.now()
    question_id: str
    answer: str
    time_spent: int
    segments_watched: List[str] = []
    annotator: str

    class Config:
        from_attributes = True

    def to_json(self):
        return self.dict()
