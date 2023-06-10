import React, {useContext, useState} from 'react';
import ChatItem from "./ChatItem";
import {Button} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import CreateChatModal from "./CreateChatModal";


const ChatList = observer(() => {
    const [show, setShow] = useState(false);
    const {chat} = useContext(Context);

    return (
        <div className="d-flex flex-column rounded-4 me-4 w-25"
            style={{height: 700, background: "#9DB2BF"}}>
            <div className="d-flex flex-column overflow-auto h-100">
                {chat.chatList?.map(item => <ChatItem key={item.id} item={item}/>)}
            </div>
            <div className="mt-3 mb-3 mx-3">
                <Button className="w-100" variant="dark" onClick={() => setShow(true)}>Создать чат</Button>
            </div>
            <CreateChatModal setShow={setShow} show={show}/>
        </div>
    );
});

export default ChatList;