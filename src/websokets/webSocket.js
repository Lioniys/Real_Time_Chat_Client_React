

export const newWebSocket = () => {
    return new WebSocket(`ws://localhost:8080/ws/`)
}

export const sendFirstMessage = (ws, channels) => {
    ws.onopen = () => {
        if (channels.length) {
            ws.send(JSON.stringify({
                event: "first",
                channels: [...channels.map(i => i.id)]
            }))
        }}
}

export const sendMessage = (ws, userId, value, channel) => {
    ws.send(JSON.stringify(
        {
            event: "next",
            message: {
                channel: channel,
                sender: userId,
                text: value,
                }
        })
    )
}

export const listen = (ws, callBack) => {
    ws.onmessage = (event) => {
        const msg = JSON.parse(JSON.parse(event.data))
        callBack(msg)
    }
}
