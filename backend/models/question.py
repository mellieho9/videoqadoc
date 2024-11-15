from datetime import datetime

class Question:
    def __init__(self, id, question_id, question, choices, created_at=None):
        self.id = id
        self.created_at = created_at if created_at else datetime.now()
        self.question_id = question_id
        self.question = question
        self.choices = choices

    def __repr__(self):
        return str(self.to_json())

    def to_json(self):
        return {
            "id": self.id,
            "created_at": self.created_at.isoformat(),
            "question_id": self.question_id,
            "question": self.question,
            "choices": self.choices
        }

