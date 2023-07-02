import React, {useContext} from 'react';
import {Card} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {getChat} from "../http/chatAPI";


const ChatItem = observer(({item}) => {
    const {chat} = useContext(Context);

    const select = () => {
        getChat(item.id).then(r => {
            chat.setSelectChat(r);
        }).catch(e => console.log(e));
    }

    return (
        <Card
            className="m-2 p-1 rounded-4 text-muted"
            style={{background: '#CCD6A6', cursor: "pointer"}}
            onClick={() => select()}
        >
            <div className="d-flex flex-column mx-2">
                <div className="d-flex text-muted">{item.name}</div>
                <div className="d-flex flex-column">непрочитаных</div>
                <div className="d-flex justify-content-between text-muted">
                    <div className="d-flex">date</div>
                    <div className="d-flex">time</div>
                </div>
            </div>
        </Card>
    );
});

export default ChatItem;