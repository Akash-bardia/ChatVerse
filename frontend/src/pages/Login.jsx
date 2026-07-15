import { useState } from "react"
import { useNavigate } from "react-router-dom"

import API from "../services/api"

function Login() {

    const navigate = useNavigate()

    // TOGGLE LOGIN/SIGNUP
    const [isLogin, setIsLogin] = useState(true)

    // FORM STATES
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    // LOGIN FUNCTION
    async function handleLogin(e) {

        e.preventDefault()

        try {

            const formData = new URLSearchParams()

            formData.append("username", email)
            formData.append("password", password)

            const response = await API.post(
                "/login",
                formData,
                {
                    headers: {
                        "Content-Type":
                        "application/x-www-form-urlencoded"
                    }
                }
            )

            // SAVE TOKEN
            localStorage.setItem(
                "token",
                response.data.access_token
            )

            // FETCH USER INFO
            const userResponse = await API.get(
                "/me",
                {
                    headers: {
                        Authorization:
                        `Bearer ${response.data.access_token}`
                    }
                }
            )

            // SAVE USERNAME
            localStorage.setItem(
                "username",
                userResponse.data.username
            )

            navigate("/rooms")

        } catch (error) {

            console.log(error)

            alert("Login failed")
        }
    }

    // SIGNUP FUNCTION
    async function handleSignup(e) {

        e.preventDefault()

        try {

            await API.post("/signup", {

                username,
                email,
                password

            })

            alert("Account created successfully!")

            setIsLogin(true)

        } catch (error) {

            console.log(error)

            alert("Signup failed")
        }
    }

    return (

        <div className="auth-container">

            <div className="auth-card">

                <h1>
                    {
                        isLogin
                        ? "Login"
                        : "Create Account"
                    }
                </h1>

                <form
                    onSubmit={
                        isLogin
                        ? handleLogin
                        : handleSignup
                    }
                >

                    {
                        !isLogin && (

                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) =>
                                    setUsername(
                                        e.target.value
                                    )
                                }
                            />
                        )
                    }

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                    />

                    <button type="submit">

                        {
                            isLogin
                            ? "Login"
                            : "Create Account"
                        }

                    </button>

                </form>

                <br />

                <button
                    onClick={() =>
                        setIsLogin(!isLogin)
                    }
                >

                    {
                        isLogin
                        ? "Create new account"
                        : "Already have an account?"
                    }

                </button>

            </div>

        </div>
    )
}

export default Login