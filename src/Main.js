import React, {useContext} from 'react';
import {Container, Row} from "react-bootstrap";
import Chat from "./Chat";
import ChatList from "./components/ChatList";
import {observer} from "mobx-react-lite";
import {Context} from "./index";


const Main = observer(() => {
    const {chat} = useContext(Context);

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