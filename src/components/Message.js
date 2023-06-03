import React from 'react';
import {client_id} from "../webSocket";
import {Card} from "react-bootstrap";


const Message = ({msg}) => {

    return (
        <div className={msg.id === client_id ? "d-flex justify-content-end ms-5 me-2" : "d-flex me-5 ms-2"}>
            <Card className="mt-1 mb-1 p-1 rounded-5"
                  style={msg.id === client_id ?
                      { background: "#FBFFB1"}
                      :
                      { background: "#B9F3E4"}}
            >
                <div className="d-flex flex-column mx-2 mt-2">
                    <div className="d-flex text-muted">{msg.id !== client_id ? `id ${msg.id}` : ''}</div>
                    <div className="d-flex flex-column">
                        {msg.message.split('\n').map(str => <div className="d-flex">{str}</div>)}
                    </div>
                    {msg.id !== client_id ?
                        <div className="d-flex justify-content-between text-muted">
                            <div className="d-flex">{msg.date}</div>
                            <div className="d-flex">{msg.time}</div>
                        </div>
                        :
                        <div className="d-flex justify-content-between text-muted">
                            <div className="d-flex">{msg.time}</div>
                            <div className="d-flex">{msg.date}</div>
                        </div>
                    }
                </div>
            </Card>
        </div>
    );
};

export default Message;