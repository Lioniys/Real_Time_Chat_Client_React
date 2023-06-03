import React from 'react';
import {Card} from "react-bootstrap";

const ChatItem = () => {
    return (
        <Card className="m-2 p-1 rounded-4 text-muted" style={{background: '#CCD6A6'}}>
            <div className="d-flex flex-column mx-2 mt-2">
                <div className="d-flex text-muted">id</div>
                <div className="d-flex flex-column">text</div>
                <div className="d-flex justify-content-between text-muted">
                    <div className="d-flex">date</div>
                    <div className="d-flex">time</div>
                </div>
            </div>
        </Card>
    );
};

export default ChatItem;