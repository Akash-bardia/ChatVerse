import { useEffect, useState, useRef } from "react"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import API from "../services/api"
import MessageBubble from "../components/MessageBubble"
import Navbar from "../components/Navbar"
import "../styles/chat.css"

function Chat() {
    const { roomName } = useParams()
    const username = localStorage.getItem("username")

    const [socket, setSocket] = useState(null)
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState("")
    const [onlineUsers, setOnlineUsers] = useState([])
    const [loadingMessages, setLoadingMessages] = useState(true)

    const messagesEndRef = useRef(null)

    async function fetchMessages() {
        try {
            const response = await API.get(`/messages/${roomName}`)
            setMessages(response.data)
        } catch (err) {
            toast.error("Failed to load messages")
        } finally {
            setLoadingMessages(false)
        }
    }

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    // Connect to WebSocket on mount
    useEffect(() => {
        fetchMessages()

        const ws = new WebSocket(
            `ws://127.0.0.1:8000/ws/chat/${roomName}/${username}`
        )

        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data)

                if (data.type === "online_users") {
                    setOnlineUsers(data.users)
                    return
                }

                setMessages((prev) => [...prev, data])
            } catch {
                toast.error("Failed to parse message")
            }
        }

        ws.onerror = () => {
            toast.error("WebSocket connection error")
        }

        setSocket(ws)

        return () => {
            ws.close()
        }
    }, [roomName])

    function sendMessage() {
        if (!message.trim() || !socket) return

        socket.send(
            JSON.stringify({
                username: username,
                text: message,
            })
        )

        setMessage("")
    }

    function handleKeyPress(e) {
        if (e.key === "Enter") {
            sendMessage()
        }
    }

    const isSendDisabled = !message.trim()

    return (
        <>
            <Navbar />

            <div className="chat-container">
                <div className="chat-header">
                    <h2>💬 {roomName}</h2>
                    <span className="chat-header-count">
                        {onlineUsers.length} online
                    </span>
                </div>

                <div className="chat-body">
                    {/* Online Users Sidebar */}
                    <div className="online-users">
                        <h3>🟢 Online Users</h3>
                        {onlineUsers.length === 0 ? (
                            <p className="online-users-empty">No users online</p>
                        ) : (
                            onlineUsers.map((user, index) => (
                                <div key={index} className="online-user">
                                    <span className="online-dot"></span>
                                    {user}
                                </div>
                            ))
                        )}
                    </div>

                    {/* Chat Main Area */}
                    <div className="chat-main">
                        <div className="chat-messages">
                            {loadingMessages ? (
                                <div className="loading-container">
                                    <div className="loading-spinner"></div>
                                    <span>Loading messages...</span>
                                </div>
                            ) : messages.length === 0 ? (
                                <div className="empty-state">
                                    <div className="empty-state-icon">💬</div>
                                    <div className="empty-state-title">No messages yet</div>
                                    <div className="empty-state-text">
                                        Start the conversation! Send the first message.
                                    </div>
                                </div>
                            ) : (
                                messages.map((msg, index) => (
                                    <MessageBubble
                                        key={index}
                                        message={msg}
                                        currentUser={username}
                                    />
                                ))
                            )}
                            <div ref={messagesEndRef}></div>
                        </div>

                        <div className="chat-input">
                            <input
                                type="text"
                                placeholder="Type your message..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyDown={handleKeyPress}
                            />
                            <button
                                className="chat-send-btn"
                                onClick={sendMessage}
                                disabled={isSendDisabled}
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Chat