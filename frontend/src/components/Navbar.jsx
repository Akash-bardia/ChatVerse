import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import Avatar from "./Avatar"
import "../styles/navbar.css"

function Navbar() {
    const navigate = useNavigate()
    const username = localStorage.getItem("username")

    function logout() {
        localStorage.clear()
        toast.success("Logged out successfully")
        navigate("/")
    }

    return (
        <nav className="navbar">
            <div className="nav-logo">
                💬 ChatVerse
            </div>

            <div className="nav-right">
                <div className="nav-user">
                    <Avatar username={username} size="small" />
                    <span>{username}</span>
                </div>

                <button className="nav-logout-btn" onClick={logout}>
                    Logout
                </button>
            </div>
        </nav>
    )
}

export default Navbar