from pydantic import BaseModel

class RoomCreate(BaseModel):
    name : str

class RoomUpdate(BaseModel):
    name : str