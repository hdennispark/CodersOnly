import React, { useEffect, useState } from 'react';
import SendMessage from './components/SendMessage'

const Chat = (props) => {
    return (
        <div>
            <h1 className='chat'>Chat</h1>
            <button onClick={() => {} }>
                Back to Login
            </button>
            {messages}
            <SendMessage />
        </div>
    )
}


export default Chat;


//when user clicks, socket event is emitted to backend
//server receives socket event to "open" room, this will be the messages "convo" component Chat.js
