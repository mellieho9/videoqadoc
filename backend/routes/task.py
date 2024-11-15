from fastapi import APIRouter, HTTPException
from services.task import TaskService
from models.annotation import Annotation

router = APIRouter()


@router.get("/tasks/{annotator_id}")
def get_tasks_by_annotator(annotator_id: str):
    data = TaskService.get_tasks(annotator_id)
    if not data:
        raise HTTPException(status_code=404, detail="Tasks not found for this annotator")
    return data

@router.get("/task/{task_id}")
def get_task_by_id(task_id: str):
    data = TaskService.get_task(task_id)
    if not data:
        raise HTTPException(status_code=404, detail="No task found with this ID")
    return data

@router.post("/{task_id}/submit")
def add_annotations(task_id: str, annotation: Annotation):
    data = TaskService.add_annotations(task_id,annotation)
    if not data:
        raise HTTPException(status_code=500, detail="Failed to add annotation")
    return data
