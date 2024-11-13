from models.annotation import Annotation
from services.supabase import supabase_client

annotation_table = supabase_client.table("annotations")
class AnnotationService:

    @staticmethod
    def publish_annotation(id, question_id, answer, time_spent, segments_watched, annotator):
        annotation = Annotation(id, question_id, answer, time_spent, segments_watched, annotator)
        response = annotation_table.insert(annotation.to_json()).execute()
        return response.data
