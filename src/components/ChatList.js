import React, {useContext, useEffect, useState} from 'react';
import ChatItem from "./ChatItem";
import {Alert, Button} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import CreateChatModal from "./CreateChatModal";
import {getChats} from "../http/chatAPI";
import {Context} from "../index";


const ChatList = observer(() => {
    const [show, setShow] = useState(false);
    const [trigger, setTrigger] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [dataAlert, setDataAlert] = useState('чат создан');
    const [typeAlert, setTypeAlert] = useState('success');
    const [chatList , setChatList] = useState([])
    const {user} = useContext(Context);

    useEffect(() => {
        if (user.isAuth) {
            getChats().then(r => {
                setChatList(r)
            }).catch(e => console.log(e))
        }
    }, [user.isAuth])

    return (
        <div className="d-flex flex-column rounded-4 me-4 w-25"
            style={{height: 700, background: "#9DB2BF"}}>
            <Alert
                style={{width:500}}
                className="text-center position-absolute top-1 start-50 translate-middle"
                show={showAlert}
                variant={typeAlert}
            >{dataAlert}</Alert>
            <div className="d-flex flex-column overflow-auto h-100">
                {chatList?.map(item => <ChatItem key={item.id} item={item}/>)}
            </div>
            <div className="mt-3 mb-3 mx-3">
                <Button
                    className="w-100"
                    variant="dark"
                    onClick={() => {
                        setShow(true)
                        setTrigger(!trigger)
                    }}
                >Создать чат</Button>
            </div>
            <CreateChatModal
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

export default ChatList;