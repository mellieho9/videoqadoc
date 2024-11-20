from fastapi import APIRouter, HTTPException
from services.annotation import AnnotationService

router = APIRouter()

@router.get("/completed_questions/{annotator_id}")
def get_completed_questions(annotator_id: str):
    data = AnnotationService.get_complete_questions(annotator_id)
    return data
