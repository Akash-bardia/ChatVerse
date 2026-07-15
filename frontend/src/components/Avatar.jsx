import "../styles/avatar.css"

// Deterministic color palette for avatars based on username
const AVATAR_COLORS = [
    "#6366f1", "#8b5cf6", "#a855f7", "#d946ef",
    "#ec4899", "#f43f5e", "#ef4444", "#f97316",
    "#eab308", "#22c55e", "#14b8a6", "#06b6d4",
    "#3b82f6", "#6366f1", "#8b5cf6", "#a78bfa",
]

function getColorFromUsername(username) {
    let hash = 0
    for (let i = 0; i < username.length; i++) {
        hash = username.charCodeAt(i) + ((hash << 5) - hash)
    }
    return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length]
}

function Avatar({ username, size = "default" }) {
    const initial = username ? username.charAt(0).toUpperCase() : "?"
    const bgColor = getColorFromUsername(username || "?")

    const sizeClass = size === "small"
        ? "avatar avatar--small"
        : size === "large"
            ? "avatar avatar--large"
            : "avatar"

    return (
        <div className={sizeClass} style={{ backgroundColor: bgColor }}>
            {initial}
        </div>
    )
}

export default Avatar