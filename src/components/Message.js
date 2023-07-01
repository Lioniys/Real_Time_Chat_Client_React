import React, {useContext} from 'react';
import {Card} from "react-bootstrap";
import {Context} from "../index";
import {observer} from "mobx-react-lite";


const Message = observer(({msg}) => {
    const {user} = useContext(Context);
    const time = msg.datetime.split('T')[1]
    const date = msg.datetime.split('T')[0]

    return (
        <div className={msg.sender === user.user.id ? "d-flex justify-content-end ms-5 me-2" : "d-flex me-5 ms-2"}>
            <Card className="mt-1 mb-1 p-1 rounded-5"
                  style={msg.sender === user.user.id ?
                      { background: "#FBFFB1"}
                      :
                      { background: "#B9F3E4"}}
            >
                <div className="d-flex flex-column mx-2 mt-2">
                    <div className="d-flex text-muted">{msg.sender !== user.user.id ? `id ${msg.sender}` : ''}</div>
                    <div className="d-flex flex-column">
                        {msg.text.split('\n').map((str, index) => <div key={index} className="d-flex">{str}</div>)}
                    </div>
                    {msg.sender !== user.user.id ?
                        <div className="d-flex justify-content-between text-muted">
                            <div className="d-flex">{date}</div>
                            <div className="d-flex">{time}</div>
                        </div>
                        :
                        <div className="d-flex justify-content-between text-muted">
                            <div className="d-flex me-3">{time}</div>
                            <div className="d-flex">{date}</div>
                        </div>
                    }
                </div>
            </Card>
        </div>
    );
});

export default Message;