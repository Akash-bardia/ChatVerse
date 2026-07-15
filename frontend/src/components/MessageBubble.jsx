import Avatar from "./Avatar"
import "../styles/messageBubble.css"

/**
 * Format a timestamp into a human-friendly string.
 * - Today: "Today 14:30"
 * - Yesterday: "Yesterday 14:30"
 * - Older: "Jul 15 14:30"
 */
function formatMessageTime(timestamp) {
    if (!timestamp) return ""

    const date = new Date(timestamp)
    const now = new Date()
    const timeStr = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    })

    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    const msgDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())

    if (msgDate.getTime() === today.getTime()) {
        return `Today ${timeStr}`
    } else if (msgDate.getTime() === yesterday.getTime()) {
        return `Yesterday ${timeStr}`
    } else {
        const monthDay = date.toLocaleDateString([], {
            month: "short",
            day: "numeric",
        })
        return `${monthDay} ${timeStr}`
    }
}

function MessageBubble({ message, currentUser }) {
    const isMine = message.username === currentUser

    return (
        <div className={`message-row ${isMine ? "mine" : "other"}`}>
            {!isMine && (
                <div className="message-avatar">
                    <Avatar username={message.username} size="small" />
                </div>
            )}

            <div className="message-bubble">
                <div className="message-user">
                    {isMine ? "You" : message.username}
                </div>
                <div className="message-text">
                    {message.text || message.content}
                </div>
                <div className="message-time">
                    {formatMessageTime(message.timestamp)}
                </div>
            </div>

            {isMine && (
                <div className="message-avatar">
                    <Avatar username={message.username} size="small" />
                </div>
            )}
        </div>
    )
}

export default MessageBubble