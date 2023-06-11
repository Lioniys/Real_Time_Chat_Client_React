import React, {useContext, useState} from 'react';
import {Alert, Button, Form} from "react-bootstrap";
import {ws, client_id} from "./webSocket";
import Message from "./components/Message";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import AddUserModal from "./components/AddUserModal";


const Chat = observer(() => {
    const [messages, setMessages] = useState([])
    const [value, setValue] = useState('')
    const [show, setShow] = useState(false);
    const [trigger, setTrigger] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [dataAlert, setDataAlert] = useState('Пользователь добавлен');
    const [typeAlert, setTypeAlert] = useState('success');
    const {chat} = useContext(Context);
    const {user} = useContext(Context);

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
            <Alert
                style={{width:500}}
                className="text-center position-absolute top-1 start-50 translate-middle"
                show={showAlert}
                variant={typeAlert}
            >{dataAlert}</Alert>
            {chat.selectChat.name ?
                <div className="d-flex rounded-4 justify-content-between" style={{background: "#9DB2BF"}}>
                    <div className="d-flex align-items-center ms-3 fs-3">{chat.selectChat.name}</div>
                    <div className="d-flex flex-row m-2">
                        <Button
                            variant="dark"
                            size="sm"
                            className="mx-2"
                            onClick={() => {
                                setShow(true)
                                setTrigger(!trigger)
                            }}
                        >Добавить учасника</Button>
                        {chat.selectChat.owner.id === user.user.id ?
                            <Button variant="dark" size="sm">Удалить чат</Button>
                            :
                            <Button variant="dark" size="sm">Покинуть чат</Button>
                        }
                    </div>
                </div>
                : ''}
            <div className="d-flex flex-column-reverse h-100 overflow-auto">
                {messages?.map(msg => <Message msg={msg}/>)}
            </div>
            <div className="d-flex justify-content-center">
                <Form.Control
                    name="text"
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
            <AddUserModal
                setShow={setShow}
                show={show}
                trigger={trigger}
                setShowAlert={setShowAlert}
                setDataAlert={setDataAlert}
                setTypeAlert={setTypeAlert}
            />
        </div>
    );
});

export default Chat;