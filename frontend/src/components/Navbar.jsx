import { useNavigate } from "react-router-dom"
import "../styles/navbar.css"
function Navbar() {

    const navigate = useNavigate()

    const username = localStorage.getItem("username")

    function logout() {

        localStorage.clear()

        navigate("/")
    }

    return (

        <nav className="navbar">

            <div className="logo">

                💬 ChatVerse

            </div>

            <div className="nav-right">

                <span>

                    👤 {username}

                </span>

                <button onClick={logout}>

                    Logout

                </button>

            </div>

        </nav>

    )

}

export default Navbar