import json
from contextlib import asynccontextmanager
from typing import Dict, List

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from models.video import Video

# Global state
videos: Dict[str, Video] = {}
videos_ids: List[str] = []


def init_data():
    """Initializes data from Video-MME.json"""
    try:
        with open("Video-MME.json", "r", encoding="UTF-8") as f:
            video_mme = json.load(f)

        for video in video_mme:
            vid_obj = Video.parse_video_mme(video)
            videos[vid_obj.video_id] = vid_obj
            videos_ids.append(vid_obj.video_id)
    except FileNotFoundError:
        print("Warning: Video-MME.json not found. Using sample data.")
        # Add sample data here if needed


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Context manager to handle startup and shutdown events."""
    # Startup
    init_data()
    yield
    # Shutdown


app = FastAPI(lifespan=lifespan)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/questions")
def get_questions():
    """Returns questions grouped by video."""
    # Return questions grouped by video
    return [[q.to_json() for q in videos[vid].questions] for vid in videos_ids[:30]]


@app.get("/api/questions/{question_id}")
def get_question(question_id: str):
    """Returns a specific question by ID."""
    actual_id = question_id.split("-")[0]
    video = videos.get(actual_id)
    if not video:
        return {"error": "Video not found"}
    question = next((q for q in video.questions if q.question_id == question_id), None)
    if not question:
        return {"error": "Question not found"}

    return {
        "videoId": video.url.split("=")[1],  # Using URL as video ID for YouTube embed
        "question": question.question,
        "options": list(question.choices.values()),
        "completed": question.completed,
    }


@app.post("/api/questions/{question_id}/submit")
async def submit_answer(question_id: str):
    """Marks a question as completed."""
    actual_id = question_id.split("-")[0]
    video = videos.get(actual_id)
    if not video:
        return {"error": "Video not found"}

    question = next((q for q in video.questions if q.question_id == question_id), None)
    if not question:
        return {"error": "Question not found"}

    # Mark question as completed
    question.completed = True
    return {"success": True}


# Optional: endpoint to get video details
@app.get("/api/videos/{video_id}")
def get_video(video_id: str):
    """Returns details of a video by ID."""
    video = videos.get(video_id)
    if not video:
        return {"error": "Video not found"}
    return video.to_json()
