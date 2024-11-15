from datetime import datetime

class Task:
    def __init__(self, id, video_id, annotator, annotations = None):
        self.id = id
        self.created_at = datetime.now()  
        self.video_id = video_id 
        self.annotator = annotator 
        self.annotations = annotations if annotation else []
    
    def __repr__(self):
        return str(self.to_json())
    
    def to_json(self):
        return {
            "id": self.id,
            "created_at": self.created_at.isoformat(),
            "video_id": self.annotator,
            "annotator": self.annotator,
            "annotations": self.annotations
        }
