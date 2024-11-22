from typing import Annotated
from fastapi import Depends
from fastapi.security import OAuth2PasswordRequestForm

from models.user import User
from services.supabase import supabase_client
from core.security import oauth2_scheme


class AuthorizationService:

    @staticmethod
    def login_user(form_data: OAuth2PasswordRequestForm):
        try:
            response = supabase_client.auth.sign_in_with_password({"email": form_data.username, "password": form_data.password})
        # TODO: Add error handling for incorrect username or password
        except Exception as e:
            print(e)
            return None
 
        
        token = response.session.access_token

        return {"access_token": token, "token_type": "bearer"}
    
    @staticmethod
    def get_user(token: Annotated[str, Depends(oauth2_scheme)]):
        user_data = supabase_client.auth.get_user(token).user
        
        if not user_data:
            return None
        
        user = User(name=user_data.email, user_id=user_data.id, email=user_data.email)
        
        return user
        # TODO: Maybe pull from display_name instead of email: https://github.com/orgs/supabase/discussions/20060