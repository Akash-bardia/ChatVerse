from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from sqlalchemy.orm import Session
from datetime import datetime
import json

from app.websockets.manager import manager
from app.database.connection import SessionLocal
from app.models.message import Message

router = APIRouter()


# Room-specific websocket
@router.websocket("/ws/chat/{room_name}/{username}")
async def websocket_chat(
    websocket: WebSocket,
    room_name: str,
    username: str
):
    await manager.connect(room_name, username, websocket)

    db: Session = SessionLocal()

    try:
        while True:

            # Receive JSON string from frontend
            data = await websocket.receive_text()

            # Convert JSON string to Python dictionary
            parsed_data = json.loads(data)

            text = parsed_data["text"]

            # Generate server timestamp
            timestamp = datetime.utcnow()

            # Save message to database
            new_message = Message(
                username=username,
                room=room_name,
                content=text,
                timestamp=timestamp
            )

            db.add(new_message)
            db.commit()

            # Add timestamp before broadcasting
            parsed_data["timestamp"] = timestamp.isoformat()

            # Broadcast to everyone in the room
            await manager.broadcast(
                room_name,
                json.dumps(parsed_data)
            )

    except WebSocketDisconnect:
        manager.disconnect(room_name, username, websocket)
        await manager.broadcast_online_users(room_name)

    finally:
        db.close()