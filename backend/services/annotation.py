from models.annotation import Annotation
from services.supabase import supabase_client

annotation_table = supabase_client.table("annotations")
class AnnotationService:

    @staticmethod
    def publish_annotation(id, question_id, answer, time_spent, segments_watched, annotator):
        annotation = Annotation(
            id=id,
            question_id=question_id,
            answer=answer,
            time_spent=time_spent,
            segments_watched=segments_watched,
            annotator=annotator
        )

        response = annotation_table.insert(annotation.to_json()).execute()
        return response.data

    @staticmethod
    def get_complete_questions(annotator_id: str):
        response = annotation_table.select("question_id").eq("annotator", annotator_id).execute()
        # If no questions are found, return an empty list
        if response.data:
            return [item['question_id'] for item in response.data]
        return []