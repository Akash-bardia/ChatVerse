function Avatar({ username }) {

    const initial =
        username
            ? username.charAt(0).toUpperCase()
            : "?"

    return (

        <div
            style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: "#6366f1",
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bold",
                fontSize: "18px",
                flexShrink: 0
            }}
        >
            {initial}
        </div>
    )
}

export default Avatar