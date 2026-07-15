# 💬 ChatVerse

A modern full-stack real-time chat application built using **FastAPI**, **React**, **PostgreSQL**, and **WebSockets**. The application supports secure authentication, real-time messaging, persistent chat history, and chat room management.

---

## 🚀 Features

### Authentication

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Logout

---

### Chat Rooms

- Create Chat Rooms
- Rename Rooms
- Delete Rooms
- Search Rooms
- Join Rooms

---

### Real-Time Messaging

- WebSocket Communication
- Instant Message Delivery
- Auto Scroll
- Previous Chat History
- Message Persistence

---

### User Experience

- Responsive UI
- Message Bubbles
- User Avatars
- Navbar
- Search Functionality
- Modern Dashboard

---

## 🛠 Tech Stack

### Frontend

- React (Vite)
- React Router DOM
- Axios
- CSS

### Backend

- FastAPI
- SQLAlchemy
- WebSockets
- JWT Authentication

### Database

- PostgreSQL

---

# 📁 Project Structure

```
Chat_Application/

│
├── backend/
│   ├── app/
│   │
│   ├── auth/
│   ├── database/
│   ├── models/
│   ├── routes/
│   ├── schemas/
│   ├── websockets/
│   ├── main.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── styles/
│   └── package.json
│
├── screenshots/
│
└── README.md
```

---

# 📸 Application Screenshots

## Login

![Login](screenshots/login.png)

---

## Registration

![Register](screenshots/register.png)

---

## Chat Rooms

![Rooms](screenshots/rooms.png)

---

## Create Room

![Create Room](screenshots/create-room.png)

---

## Chat Interface

![Chat](screenshots/chat.png)

---

## Rename / Delete Rooms

![Rename](screenshots/rename-room.png)

---

## Search Rooms

![Search](screenshots/search-room.png)

---

## PostgreSQL Database

![Database](screenshots/database.png)

---

# ⚙ Backend Installation

Clone the repository

```bash
git clone https://github.com/<your-username>/Real-Time-Chat-Application.git
```

Go to backend

```bash
cd backend
```

Create virtual environment

```bash
python -m venv venv
```

Activate

Windows

```bash
venv\Scripts\activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

---

## Configure Environment Variables

Create a `.env` file inside the backend directory.

Example

```env
SECRET_KEY=YOUR_SECRET_KEY

DATABASE_URL=postgresql://USERNAME:PASSWORD@localhost:5432/chatapp
```

---

Run FastAPI

```bash
python -m uvicorn app.main:app --reload
```

Backend URL

```
http://127.0.0.1:8000
```

Swagger

```
http://127.0.0.1:8000/docs
```

---

# 💻 Frontend Installation

Go to frontend

```bash
cd frontend
```

Install packages

```bash
npm install
```

Run

```bash
npm run dev
```

Frontend URL

```
http://localhost:5173
```

---

# 📡 REST APIs

## Authentication

```
POST /signup

POST /login
```

---

## Rooms

```
GET /rooms

POST /rooms

PUT /rooms/{id}

DELETE /rooms/{id}
```

---

## Messages

```
GET /messages/{room_name}
```

---

## WebSocket

```
ws://localhost:8000/ws/chat/{room_name}/{username}
```

---

# 🗄 Database Tables

The project stores data in PostgreSQL using SQLAlchemy ORM.

Tables include

- Users
- Rooms
- Messages

---

# 🔒 Authentication

The application uses

- JWT Tokens
- Password Hashing (bcrypt)
- OAuth2 Authentication
- Protected API Routes

---

# 🔄 WebSocket Flow

```
User Login
      │
      ▼
Join Chat Room
      │
      ▼
WebSocket Connection
      │
      ▼
Send Message
      │
      ▼
Store in PostgreSQL
      │
      ▼
Broadcast to Room
      │
      ▼
Update UI Instantly
```

---

# ✨ Future Improvements

- Typing Indicator
- Online Users
- Message Reactions
- File Sharing
- Image Sharing
- Read Receipts
- User Profiles
- Theme Switching (Dark/Light Mode)

---

# 👨‍💻 Author

**Akash**

GitHub: https://github.com/akash-bardia

LinkedIn: https://linkedin.com/in/AkashBardia

---

## ⭐ If you found this project useful, consider giving it a star!