from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from services.auth import AuthorizationService
from models.user import User

router = APIRouter()

@router.post("/login")
async def login_user(form_data: Annotated[OAuth2PasswordRequestForm, Depends()]):
    authorization = AuthorizationService.login_user(form_data)
    if not authorization:
        raise HTTPException(status_code=404, detail="Invalid Credentials")
    return authorization

@router.post("/me")
async def test(current_user: Annotated[User, Depends(AuthorizationService.get_user)]):
    return current_user.to_json()