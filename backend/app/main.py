from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database.connection import engine, Base
from app.models.user import User
from app.routes.auth import router as auth_router
from app.models.room import Room
from app.routes.room import router as room_router
from app.routes.chat import router as chat_router
from app.routes.message import router as message_router

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)

Base.metadata.create_all(bind = engine)

app.include_router(auth_router)
app.include_router(room_router)
app.include_router(chat_router)
app.include_router(message_router)

@app.get("/")
def home():
    return {"message" : "Chat App backend running"}