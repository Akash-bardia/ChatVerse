from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.message import Message
from app.auth.jwt_handler import get_current_user

router = APIRouter(prefix="/messages" , tags = ["Messages"])

#Only the authenticated user can access the chat
@router.get("/{room_name}")
def get_messages(room_name : str , db : Session = Depends(get_db), current_user : str = Depends(get_current_user)):
    messages = (db.query(Message)
                .filter(Message.room == room_name)
                .order_by(Message.timestamp.asc())
                .all())
    return messages