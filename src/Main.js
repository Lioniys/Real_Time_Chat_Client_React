import React, {useContext, useEffect} from 'react';
import {Container, Row} from "react-bootstrap";
import Chat from "./Chat";
import ChatList from "./components/ChatList";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {getChats} from "./http/chatAPI";


const Main = observer(() => {
    const {chat} = useContext(Context);

    useEffect(() => {
        getChats().then(r => {
            // chat.setChatList(r)
            console.log(r)
        }).catch(e => console.log(e))
    })

    return (
        <Container>
            <Row className="mt-3">
                <div className="d-flex flex-row">
                    {chat.chatListBool ? <ChatList/> : ''}
                    <Chat/>
                </div>
            </Row>
        </Container>
    );
});

export default Main;