from fastapi import APIRouter, HTTPException
from services.question import QuestionService

router = APIRouter()

@router.get("{question_id}")
def get_question(question_id: str):
    data = QuestionService.get_question(question_id)
    if not data:
        raise HTTPException(status_code=404, detail="Question not found")
    return data
