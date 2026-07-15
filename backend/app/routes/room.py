from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.connection import get_db
from app.models.room import Room
from app.schemas.room_schema import RoomCreate, RoomUpdate
from app.auth.jwt_handler import get_current_user
from app.models.user import User
from fastapi import HTTPException

router = APIRouter(prefix="/rooms" , tags=["Rooms"])

@router.post("/")
def create_room(room : RoomCreate , db :Session = Depends(get_db) , current_user:str = Depends(get_current_user)):
    new_room = Room(name = room.name)
    db.add(new_room)
    db.commit()
    db.refresh(new_room)

    return {"message" : "Room created" , "room" : new_room.name}

@router.get("/")
def get_rooms(db : Session = Depends(get_db), current_user: str = Depends(get_current_user)):
    rooms = db.query(Room).all()
    return rooms

@router.delete("/{room_id}")
def delete_room(room_id:int , db:Session = Depends(get_db) , current_user = Depends(get_current_user)):
    room = db.query(Room).filter(Room.id == room_id).first()
    if not room:
        raise HTTPException(status_code=404 ,detail="Room not found")
    db.delete(room)
    db.commit()
    return {"message" :"Room Deleted"}

@router.put("/{room_id}")
def update_room(room_id: int,updated_data: RoomUpdate,db: Session = Depends(get_db),current_user: User = Depends(get_current_user)):

    room = db.query(Room).filter(Room.id == room_id).first()

    if not room:
        raise HTTPException(status_code=404,detail="Room not found")

    room.name = updated_data.name
    db.commit()
    db.refresh(room)
    return room