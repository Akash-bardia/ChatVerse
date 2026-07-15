import {
    useEffect,
    useState,
    useRef
} from "react"

import { useParams } from "react-router-dom"

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

    const messagesEndRef = useRef(null)

    // Fetch Previous Messages
    async function fetchMessages() {

        try {

            const response = await API.get(
                `/messages/${roomName}`
            )

            setMessages(response.data)

        }

        catch (error) {

            console.log(error)

        }

    }

    // Auto Scroll
    useEffect(() => {

        messagesEndRef.current?.scrollIntoView({

            behavior: "smooth"

        })

    }, [messages])

    // Connect WebSocket
    useEffect(() => {

        fetchMessages()

        const ws = new WebSocket(

            `ws://127.0.0.1:8000/ws/chat/${roomName}/${username}`

        )

        ws.onmessage = (event) => {

            try {

                const data = JSON.parse(event.data)

                // Online users
                if (data.type === "online_users") {

                    setOnlineUsers(data.users)

                    return

                }

                // Chat message
                setMessages((prev) => [

                    ...prev,

                    data

                ])

            }

            catch (error) {

                console.log(error)

            }

        }

        setSocket(ws)

        return () => {

            ws.close()

        }

    }, [roomName])

    // Send Message
    function sendMessage() {

        if (!message.trim()) return

        if (!socket) return

        socket.send(

            JSON.stringify({

                username: username,

                text: message

            })

        )

        setMessage("")

    }

    // Enter Key
    function handleKeyPress(e) {

        if (e.key === "Enter") {

            sendMessage()

        }

    }

    return (

        <>

            <Navbar />

            <div className="chat-container">

                <div className="chat-header">

                    <h2>

                        💬 {roomName}

                    </h2>

                </div>

                <div className="chat-body">

                    {/* Online Users */}

                    <div className="online-users">

                        <h3>

                            🟢 Online Users

                        </h3>

                        {

                            onlineUsers.length === 0 ?

                            (

                                <p>

                                    No users online

                                </p>

                            )

                            :

                            (

                                onlineUsers.map((user, index) => (

                                    <div

                                        key={index}

                                        className="online-user"

                                    >

                                        🟢 {user}

                                    </div>

                                ))

                            )

                        }

                    </div>

                    {/* Chat Section */}

                    <div className="chat-main">

                        <div className="chat-messages">

                            {

                                messages.map((msg, index) => (

                                    <MessageBubble

                                        key={index}

                                        message={msg}

                                        currentUser={username}

                                    />

                                ))

                            }

                            <div ref={messagesEndRef}></div>

                        </div>

                        <div className="chat-input">

                            <input

                                type="text"

                                placeholder="Type your message..."

                                value={message}

                                onChange={(e) =>

                                    setMessage(e.target.value)

                                }

                                onKeyDown={handleKeyPress}

                            />

                            <button

                                onClick={sendMessage}

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