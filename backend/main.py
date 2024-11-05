from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict, Optional
import json

class Question:
    question_id: str
    question: str
    choices: dict[str, str]
    completed: bool = False  # Added completed field

    def __init__(self, question_id, question, choices):
        self.question_id = question_id
        self.question = question
        self.choices = choices
        self.completed = False

    @staticmethod
    def _choices_arr_to_dict_video_mme(arr: List[str]) -> dict[str, str]:
        result: dict[str, str] = {}
        for item in arr:
            split_str: List[str] = item.split(". ")
            result[split_str[0]] = split_str[1]
        return result

    @staticmethod
    def _single_parse_video_mme(question_dict):
        return Question(
            question_id=question_dict["question_id"],
            question=question_dict["question"],
            choices=Question._choices_arr_to_dict_video_mme(question_dict["choices"])
        )

    @staticmethod
    def parse_video_mme(questions_arr: List[dict]):
        return [Question._single_parse_video_mme(question_dict) for question_dict in questions_arr]

    def toJSON(self):
        return {
            "id": self.question_id,
            "question": self.question,
            "options": self.choices,
            "completed": self.completed
        }

class Video:
    video_id: str
    duration: str
    url: str
    questions: List[Question]

    def __init__(self, video_id: str, duration: str, url: str, questions: List[Question]):
        self.video_id = video_id
        self.duration = duration
        self.url = url
        self.questions = questions

    @staticmethod
    def parse_video_mme(video_dict):
        return Video(
            video_id=video_dict["video_id"],
            duration="00:05:00",  # Default duration
            url=video_dict["url"],
            questions=Question.parse_video_mme(video_dict["questions"])
        )

    def toJSON(self):
        return {
            "id": self.video_id,
            "duration": self.duration,
            "url": self.url,
            "questions": [q.toJSON() for q in self.questions]
        }

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

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Add your Next.js frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    init_data()

@app.get("/api/questions")
def get_questions():
    # Return questions grouped by video
    return [[q.toJSON() for q in videos[vid].questions] for vid in videos_ids[:30]]

@app.get("/api/questions/{question_id}")
def get_question(question_id: str):
    actual_id = question_id.split('-')[0]
    video = videos.get(actual_id)
    if not video:
        return {"error": "Video not found"}
    question = next((q for q in video.questions if q.question_id == question_id), None)
    if not question:
        return {"error": "Question not found"}
    
    return {
        "videoId": video.url.split('=')[1],  # Using URL as video ID for YouTube embed
        "question": question.question,
        "options": list(question.choices.values()),
        "completed": question.completed
    }

@app.post("/api/questions/{question_id}/submit")
async def submit_answer(question_id: str):
    actual_id = question_id.split('-')[0]
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
    video = videos.get(video_id)
    if not video:
        return {"error": "Video not found"}
    return video.toJSON()