import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import Navbar from "../components/Navbar"
import API from "../services/api"

import "../styles/rooms.css"

function Rooms() {

    const navigate = useNavigate()

    const [rooms, setRooms] = useState([])
    const [roomName, setRoomName] = useState("")
    const [search, setSearch] = useState("")

    // Fetch Rooms
    async function fetchRooms() {

        try {

            const response = await API.get("/rooms/")

            setRooms(response.data)

        }

        catch (error) {

            console.log(error)

        }

    }

    // Create Room
    async function createRoom() {

        if (!roomName.trim()) return

        try {

            await API.post("/rooms/", {

                name: roomName

            })

            setRoomName("")

            fetchRooms()

        }

        catch (error) {

            console.log(error)

        }

    }

    // Delete Room
    async function deleteRoom(roomId) {

        const confirmDelete = window.confirm(

            "Delete this room?"

        )

        if (!confirmDelete) return

        try {

            await API.delete(`/rooms/${roomId}`)

            fetchRooms()

        }

        catch (error) {

            console.log(error)

        }

    }

    // Rename Room
    async function renameRoom(roomId) {

        const newName = prompt("Enter new room name")

        if (!newName || !newName.trim()) return

        try {

            await API.put(

                `/rooms/${roomId}`,

                {

                    name: newName

                }

            )

            fetchRooms()

        }

        catch (error) {

            console.log(error)

        }

    }

    useEffect(() => {

        fetchRooms()

    }, [])

    // Search Rooms
    const filteredRooms = rooms.filter((room) =>

        room.name
            .toLowerCase()
            .includes(search.toLowerCase())

    )

    return (

        <>

            <Navbar />

            <div className="rooms-container">

                <h1>

                    Chat Rooms

                </h1>

                <br />

                {/* Search */}

                <input

                    type="text"

                    placeholder="🔍 Search Rooms..."

                    value={search}

                    onChange={(e) =>

                        setSearch(e.target.value)

                    }

                />

                <br /><br />

                {/* Create Room */}

                <input

                    type="text"

                    placeholder="Create New Room"

                    value={roomName}

                    onChange={(e) =>

                        setRoomName(e.target.value)

                    }

                />

                <br /><br />

                <button onClick={createRoom}>

                    Create Room

                </button>

                <br /><br />

                {

                    filteredRooms.map((room) => (

                        <div

                            className="room-card"

                            key={room.id}

                        >

                            <h3>

                                💬 {room.name}

                            </h3>

                            <div

                                style={{

                                    display: "flex",

                                    gap: "10px",

                                    marginTop: "10px"

                                }}

                            >

                                <button

                                    onClick={() =>

                                        navigate(

                                            `/chat/${room.name}`

                                        )

                                    }

                                >

                                    Join

                                </button>

                                <button

                                    onClick={() =>

                                        renameRoom(room.id)

                                    }

                                >

                                    Rename

                                </button>

                                <button

                                    onClick={() =>

                                        deleteRoom(room.id)

                                    }

                                >

                                    Delete

                                </button>

                            </div>

                        </div>

                    ))

                }

            </div>

        </>

    )

}

export default Rooms