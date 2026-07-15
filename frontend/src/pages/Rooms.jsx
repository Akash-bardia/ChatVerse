import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import Navbar from "../components/Navbar"
import API from "../services/api"
import "../styles/rooms.css"

function Rooms() {
    const navigate = useNavigate()

    const [rooms, setRooms] = useState([])
    const [roomName, setRoomName] = useState("")
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(true)
    const [creating, setCreating] = useState(false)

    async function fetchRooms() {
        try {
            const response = await API.get("/rooms/")
            setRooms(response.data)
        } catch (err) {
            toast.error(err.response?.data?.detail || "Failed to load rooms")
        } finally {
            setLoading(false)
        }
    }

    async function createRoom() {
        if (!roomName.trim()) return
        setCreating(true)

        try {
            await API.post("/rooms/", { name: roomName })
            toast.success(`Room "${roomName}" created!`)
            setRoomName("")
            fetchRooms()
        } catch (err) {
            toast.error(err.response?.data?.detail || "Failed to create room")
        } finally {
            setCreating(false)
        }
    }

    async function deleteRoom(roomId, name) {
        const confirmDelete = window.confirm(`Delete room "${name}"?`)
        if (!confirmDelete) return

        try {
            await API.delete(`/rooms/${roomId}`)
            toast.success(`Room "${name}" deleted`)
            fetchRooms()
        } catch (err) {
            toast.error(err.response?.data?.detail || "Failed to delete room")
        }
    }

    async function renameRoom(roomId) {
        const newName = prompt("Enter new room name")
        if (!newName || !newName.trim()) return

        try {
            await API.put(`/rooms/${roomId}`, { name: newName })
            toast.success(`Room renamed to "${newName}"`)
            fetchRooms()
        } catch (err) {
            toast.error(err.response?.data?.detail || "Failed to rename room")
        }
    }

    function handleCreateKeyPress(e) {
        if (e.key === "Enter") {
            createRoom()
        }
    }

    useEffect(() => {
        fetchRooms()
    }, [])

    const filteredRooms = rooms.filter((room) =>
        room.name.toLowerCase().includes(search.toLowerCase())
    )

    const isSearchActive = search.trim().length > 0
    const hasNoResults = filteredRooms.length === 0

    return (
        <>
            <Navbar />

            <div className="rooms-dashboard">
                <div className="rooms-header">
                    <h1>Chat Rooms</h1>
                    <span className="rooms-count">{rooms.length} rooms</span>
                </div>

                <div className="rooms-controls">
                    {/* Search Card */}
                    <div className="control-card">
                        <h3>🔍 Find a Room</h3>
                        <div className="input-wrapper">
                            <input
                                type="text"
                                placeholder="Search by room name..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Create Room Card */}
                    <div className="control-card">
                        <h3>➕ Create New Room</h3>
                        <div className="input-wrapper">
                            <input
                                type="text"
                                placeholder="Enter room title..."
                                value={roomName}
                                onChange={(e) => setRoomName(e.target.value)}
                                onKeyDown={handleCreateKeyPress}
                            />
                            <button onClick={createRoom} disabled={creating || !roomName.trim()}>
                                {creating ? "Creating..." : "Create"}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Room Grid */}
                {loading ? (
                    <div className="loading-container">
                        <div className="loading-spinner"></div>
                        <span>Loading rooms...</span>
                    </div>
                ) : hasNoResults ? (
                    <div className="rooms-empty-state">
                        <div className="empty-state">
                            <div className="empty-state-icon">
                                {isSearchActive ? "🔍" : "💬"}
                            </div>
                            <div className="empty-state-title">
                                {isSearchActive ? "No rooms found" : "No rooms yet"}
                            </div>
                            <div className="empty-state-text">
                                {isSearchActive
                                    ? `No rooms match "${search}". Try a different search.`
                                    : "Create your first chat room above to get started!"}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="rooms-grid">
                        {filteredRooms.map((room) => (
                            <div className="room-card" key={room.id}>
                                <div className="room-info">
                                    <h3>💬 {room.name}</h3>
                                    <p className="room-subtitle">Active Room Channel</p>
                                </div>

                                <div className="room-actions">
                                    <button
                                        className="btn-join"
                                        onClick={() => navigate(`/chat/${room.name}`)}
                                    >
                                        Join
                                    </button>
                                    <button
                                        className="btn-rename"
                                        onClick={() => renameRoom(room.id)}
                                    >
                                        Rename
                                    </button>
                                    <button
                                        className="btn-delete"
                                        onClick={() => deleteRoom(room.id, room.name)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}

export default Rooms