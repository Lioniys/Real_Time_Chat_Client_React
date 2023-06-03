import React from 'react';
import ChatItem from "./ChatItem";


const ChatList = () => {

    return (
        <div
            className="d-flex flex-column rounded-4 me-4 w-25 overflow-auto"
            style={{height: 700, background: "#9DB2BF"}}>
            <ChatItem/>
            <ChatItem/>
            <ChatItem/>
            <ChatItem/>
            <ChatItem/>
            <ChatItem/>
            <ChatItem/>
            <ChatItem/>
            <ChatItem/>
        </div>
    );
};

export default ChatList;