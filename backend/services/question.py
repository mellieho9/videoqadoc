from services.supabase import supabase_client

question_table = supabase_client.table("questions")

class QuestionService:

    @staticmethod
    def get_question(question_id):
        response = question_table.select("*").eq("id", question_id).execute()
        return response.data