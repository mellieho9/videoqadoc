from datetime import datetime
from typing import List
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
        data = self.dict() # dict() is deprecated, replace with self.model_dump()
        data["created_at"] = self.created_at.isoformat()  # Convert datetime to string
        return data
