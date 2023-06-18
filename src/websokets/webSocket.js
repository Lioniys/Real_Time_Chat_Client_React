

export const newWebSocket = (channels) => {
    const ws = new WebSocket(`ws://localhost:8080/ws/`)
    ws.onopen = () => {
        if (channels) {
            ws.send(JSON.stringify({
                event: "first",
                channels: channels
            }))
        }
    }
    return ws
}

export const sendMessage = (ws, userId, value, channel) => {
    ws.send(JSON.stringify(
        {
            event: "next",
            body: {
                id: userId,
                channel: channel,
                message: value,
                time: new Date().toLocaleTimeString('en-US',
                    { hour12: false, hour: "numeric", minute: "numeric"}),
                date: new Date().toLocaleDateString()
            }
        })
    )
}

export const listen = (ws, callBack) => {
    if (ws) {
        ws.onmessage = (event) => {
            const msg = JSON.parse(event.data)
            callBack(msg)
        }
    }
}
