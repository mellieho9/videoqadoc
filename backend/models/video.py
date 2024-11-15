from datetime import datetime

class Video:
    def __init__(self, id, video_id, duration, url, questions=None, created_at=None):
        self.id = id
        self.created_at = created_at if created_at else datetime.now()
        self.video_id = video_id
        self.duration = duration
        self.url = url
        self.questions = questions if questions else []

    def __repr__(self):
        return str(self.to_json())

    def to_json(self):
        return {
            "id": self.id,
            "created_at": self.created_at.isoformat(),
            "video_id": self.video_id,
            "duration": self.duration,
            "url": self.url,
            "questions": self.questions
        }