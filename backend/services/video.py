from services.supabase import supabase_client

video_table = supabase_client.table("video")
class VideoService:
 
    @staticmethod
    def get_video(video_id):
        response = video_table.select("*").eq("id", video_id).execute()
        return response.data
