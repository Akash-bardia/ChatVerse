from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.user import User
from app.schemas.user_schema import UserCreate, UserLogin
from app.auth.jwt_handler import (hash_password, verify_password , create_access_token, get_current_user)
from fastapi.security import OAuth2PasswordRequestForm

router = APIRouter()

@router.post("/signup")
def signup(user:UserCreate ,db :Session = Depends(get_db)):
    hashed_pw = hash_password(user.password)
    new_user = User(
        username = user.username,
        email = user.email,
        password = hashed_pw
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message" : "User created successfully"}

@router.post("/login")
def login(form_data : OAuth2PasswordRequestForm = Depends(), db:Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == form_data.username).first()
    if not db_user:
        raise HTTPException(status_code=404 , detail="User not found")
    if not verify_password(form_data.password , db_user.password):
        raise HTTPException(status_code=401 , detail= "Invalid password")
    token = create_access_token( data = {"sub" : db_user.email})
    return {"access_token" : token, "token_type" : "bearer"}

@router.get("/me")
def get_me(current_user : str = Depends(get_current_user)):
    return {
        "id" : current_user.id,
        "username" : current_user.username,
        "email" : current_user.email
    }