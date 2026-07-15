import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import API from "../services/api"

function Login() {
    const navigate = useNavigate()

    const [isLogin, setIsLogin] = useState(true)
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleLogin(e) {
        e.preventDefault()
        setError("")
        setLoading(true)

        try {
            const formData = new URLSearchParams()
            formData.append("username", email)
            formData.append("password", password)

            const response = await API.post("/login", formData, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            })

            localStorage.setItem("token", response.data.access_token)

            const userResponse = await API.get("/me", {
                headers: {
                    Authorization: `Bearer ${response.data.access_token}`,
                },
            })

            localStorage.setItem("username", userResponse.data.username)
            toast.success(`Welcome back, ${userResponse.data.username}!`)
            navigate("/rooms")
        } catch (err) {
            const message = err.response?.data?.detail || "Login failed. Check your email/password."
            setError(message)
            toast.error(message)
        } finally {
            setLoading(false)
        }
    }

    async function handleSignup(e) {
        e.preventDefault()
        setError("")
        setLoading(true)

        try {
            await API.post("/signup", { username, email, password })

            toast.success("Account created successfully! Please sign in.")
            setTimeout(() => {
                setIsLogin(true)
                setError("")
            }, 1500)
        } catch (err) {
            const message = err.response?.data?.detail || "Signup failed. Try a different username/email."
            setError(message)
            toast.error(message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-icon">💬</div>

                <h1>{isLogin ? "Welcome Back" : "Create Account"}</h1>

                <p className="auth-subtitle">
                    {isLogin
                        ? "Connect with ChatVerse rooms in seconds"
                        : "Sign up to join our real-time community"}
                </p>

                {error && (
                    <div className="alert alert-error">
                        <span>⚠️</span>
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={isLogin ? handleLogin : handleSignup}>
                    {!isLogin && (
                        <div className="form-group">
                            <label className="form-label">Username</label>
                            <input
                                type="text"
                                placeholder="Choose a username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                    )}

                    <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input
                            type="email"
                            placeholder="your.email@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? (
                            <span className="spinner">⏳</span>
                        ) : isLogin ? (
                            "Sign In"
                        ) : (
                            "Join ChatVerse"
                        )}
                    </button>
                </form>

                <button
                    className="auth-switch-btn"
                    onClick={() => {
                        setIsLogin(!isLogin)
                        setError("")
                    }}
                >
                    {isLogin
                        ? "Need an account? Register"
                        : "Already have an account? Sign In"}
                </button>
            </div>
        </div>
    )
}

export default Login