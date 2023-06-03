import React, {useState} from 'react';
import {Button, Form} from "react-bootstrap";
import {ws, client_id} from "./webSocket";
import Message from "./components/Message";


const Chat = () => {
    const [messages, setMessages] = useState([])
    const [value, setValue] = useState('')

    ws.onmessage = (event) => {
        const msg = JSON.parse(event.data)
        setMessages([msg, ...messages])
    }

    const sendMessage = () => {
        console.log(value)
        ws.send(JSON.stringify({
            id: client_id,
            message: value,
            time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: "numeric", minute: "numeric"}),
            date: new Date().toLocaleDateString()
        }))
        setValue('')
    }

    return (
        <div className="d-flex flex-column rounded-4 w-100" style={{height: 700, background: "#526D82"}}>
            <div className="d-flex flex-column-reverse h-100 overflow-auto">
                {messages?.map(msg => <Message msg={msg}/>)}
            </div>
            <div className="d-flex justify-content-center">
                <Form.Control
                    as="textarea"
                    rows={1}
                    className="mt-3 mb-3 ms-3"
                    placeholder="text"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    style={{background: '#DDE6ED'}}
                />
                <Button className="mt-3 mb-3 mx-3" variant="dark" onClick={() => sendMessage()}>Отправить</Button>
            </div>
        </div>
    );
};

export default Chat;