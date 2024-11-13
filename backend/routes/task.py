from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.annotation import AnnotationService
from models.annotation import Annotation

router = APIRouter()


@router.get("{annotator_id}")
def get_tasks(annotator_id: str):
    data = AnnotationService.get_tasks(annotator_id)
    if not data:
        raise HTTPException(status_code=404, detail="Tasks not found for this annotator")
    return data

@router.post("{task_id}")
def add_annotations(task_id: str, annotation: Annotation):
    data = AnnotationService.add_annotations(annotation)
    if not data:
        raise HTTPException(status_code=500, detail="Failed to add annotation")
    return data
