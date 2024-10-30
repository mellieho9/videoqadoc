import json
from typing import List
from fastapi import FastAPI
import Video


def get_json_data(file_path: str):
    return json.loads(open(file_path, "r", encoding="UTF-8").read())

videos = {}
videos_ids = []
def init_data(videos_input: List[Video.Video], videos_ids_input: List[str]):
    """Initializes data from Video-MME.json"""
    video_mme = get_json_data("Video-MME.json")

    for video in video_mme:
        vid_obj: Video = Video.parse_video_mme(video)
        videos_input[vid_obj.video_id] = vid_obj

    for video_id in videos_input:
        videos_ids_input.append(video_id)

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/video")
def get_video_ids():
    return videos_ids

@app.get("/video/{video_id}")
def get_video(video_id: str):
    return videos[video_id].toJSON()
