from datetime import datetime

class Annotation:
    def __init__(self, id, question_id, answer, time_spent, annotator, segments_watched=None):
        self.id = id
        self.created_at = datetime.now()  
        self.question_id = question_id 
        self.answer = answer 
        self.time_spent = time_spent
        self.segments_watched = segments_watched if segments_watched else []
        self.annotator = annotator
    
    def __repr__(self):
        return str(self.to_json())
    
    def to_json(self):
        return {
            "id": self.id,
            "created_at": self.created_at.isoformat(),
            "question_id": self.question_id,
            "answer": self.answer,
            "time_spent": self.time_spent,
            "segments_watched": self.segments_watched,
            "annotator": self.annotator
        }
