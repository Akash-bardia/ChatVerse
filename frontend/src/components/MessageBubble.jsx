import Avatar from "./Avatar"

import "../styles/messageBubble.css"

function MessageBubble({

    message,

    currentUser

}) {

    const isMine =

        message.username === currentUser

    return (

        <div
            className={`message-row ${
                isMine ? "mine" : "other"
            }`}
        >

            {/* Avatar on Left */}

            {

                !isMine && (

                    <div
                        style={{
                            marginRight: "10px"
                        }}
                    >

                        <Avatar
                            username={message.username}
                        />

                    </div>

                )

            }

            {/* Message Bubble */}

            <div className="message">

                <div className="message-user">

                    {

                        isMine

                            ? "You"

                            : message.username

                    }

                </div>

                <div>

                    {message.text || message.content}

                </div>

                <div className="message-time">

                    {

                        message.timestamp

                            ? new Date(
                                message.timestamp
                            ).toLocaleTimeString(
                                [],
                                {
                                    hour: "2-digit",
                                    minute: "2-digit"
                                }
                            )

                            : ""

                    }

                </div>

            </div>

            {/* Avatar on Right */}

            {

                isMine && (

                    <div
                        style={{
                            marginLeft: "10px"
                        }}
                    >

                        <Avatar
                            username={message.username}
                        />

                    </div>

                )

            }

        </div>

    )

}

export default MessageBubble