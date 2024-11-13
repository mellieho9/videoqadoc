import json
from contextlib import asynccontextmanager
from typing import Dict, List

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from services.task import TaskService

from routes.question import router as question_router
from routes.task import router as task_router
from routes.video import router as video_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Context manager to handle startup and shutdown events."""
    # Startup
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

app.include_router(question_router, prefix="/questions", tags=["questions"])
app.include_router(task_router, prefix="/tasks", tags=["tasks"])
app.include_router(video_router, prefix="/videos", tags=["videos"])

