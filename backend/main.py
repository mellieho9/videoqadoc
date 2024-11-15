from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.question import router as question_router
from routes.task import router as task_router
from routes.video import router as video_router
from routes.annotation import router as annotation_router



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
app.include_router(annotation_router, prefix="/annotations", tags=["annotations"])
