from services.supabase import supabase_client
from services.annotation import AnnotationService

task_table = supabase_client.table("tasks")

class TaskService:
    @staticmethod
    def get_tasks(annotator_id):
        response = task_table.select("*").eq("annotator", annotator_id).execute()
        return response.data

    @staticmethod
    def get_task(task_id):
        response = task_table.select("*").eq("id", task_id).execute()
        return response.data

    @staticmethod
    def add_annotations(task_id, annotation):
        annotation_data = AnnotationService.publish_annotation(annotation.id,
        annotation.question_id,
        annotation.answer,
        annotation.time_spent,
        annotation.segments_watched,
        annotation.annotator)
        if annotation_data:
            annotation_id = annotation_data[0]["id"] 

            task_response = task_table.select("annotations").eq("id", task_id).execute()
            task_data = task_response.data

            if task_data and "annotations" in task_data[0]:
                annotations = task_data[0]["annotations"] or []
            else:
                annotations = []

            annotations.append(annotation_id)

            update_response = task_table.update({"annotations": annotations}).eq("id", task_id).execute()
            return update_response.data
        return None

