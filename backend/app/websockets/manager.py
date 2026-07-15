from fastapi import WebSocket
import json


class ConnectionManager:

    def __init__(self):

        # Room -> List of WebSockets
        self.active_connections = {}

        # Room -> List of usernames
        self.online_users = {}

    async def connect(
        self,
        room: str,
        username: str,
        websocket: WebSocket
    ):

        await websocket.accept()

        # Create room if it doesn't exist
        if room not in self.active_connections:

            self.active_connections[room] = []

        if room not in self.online_users:

            self.online_users[room] = []

        # Save websocket
        self.active_connections[room].append(websocket)

        # Save username
        if username not in self.online_users[room]:

            self.online_users[room].append(username)

        # Notify everyone about online users
        await self.broadcast_online_users(room)

    def disconnect(
        self,
        room: str,
        username: str,
        websocket: WebSocket
    ):

        if room in self.active_connections:

            if websocket in self.active_connections[room]:

                self.active_connections[room].remove(websocket)

        if room in self.online_users:

            if username in self.online_users[room]:

                self.online_users[room].remove(username)

    async def broadcast(
        self,
        room: str,
        message: str
    ):

        if room not in self.active_connections:

            return

        for connection in self.active_connections[room]:

            await connection.send_text(message)

    async def broadcast_online_users(self, room: str):

        if room not in self.active_connections:

            return

        payload = json.dumps({

            "type": "online_users",

            "users": self.online_users[room]

        })

        for connection in self.active_connections[room]:

            await connection.send_text(payload)


manager = ConnectionManager()


#Below is the basic way to create a websocket and broadcast the message to all the rooms in the chat room
# class ConnectionManager:
#     def __init__(self):
#         self.active_connections = []

#     #Accept the websocket connection and stores user socket
#     async def connect(self, websocket:WebSocket):
#         await websocket.accept()
#         self.active_connections.append(websocket)

#     #Removes disconnected user
#     def disconnect(self, websocket:WebSocket):
#         self.active_connections.remove(websocket)

#     #sends message to ALL users
#     async def broadcast(self, message:str):
#         for connection in self.active_connections:
#             await connection.send_text(message)

# manager = ConnectionManager() 