import os
from supabase import create_client, Client 
from dotenv import load_dotenv

load_dotenv()
url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_KEY")

supabase_client: Client = create_client(url, key)