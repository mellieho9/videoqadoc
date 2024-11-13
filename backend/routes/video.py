from fastapi import APIRouter, HTTPException
from services.video import VideoService

router = APIRouter()

@router.get("/{video_id}")
def get_video(video_id: str):
    data = VideoService.get_video(video_id)
    if not data:
        raise HTTPException(status_code=404, detail="Video not found")
    return data
