// client/src/pages/chat/send-message.js

// import styles from './styles.module.css';
import React, { useState } from 'react';
// import io from 'socket.io-client'
// const socket = io.connect("http://localhost:8080")
import '../stylesheets/Messages.css';

const SendMessage = ({ socket, username, room }) => {
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    if (message !== '') {
      const __createdtime__ = Date.now();
      room = 'presentation'
      // Send message to server. We can't specify who we send the message to from the frontend. We can only send to server. Server can then send message to rest of users in room
      console.log('message', message)
      console.log('username', username)
      console.log('room', room)
      console.log('__createdtime__', __createdtime__)
      socket.emit('send_message', { message, username, room, __createdtime__ });
      setMessage('');
    }
  };

  return (
    <div className='sendMessageContainer'>
      <input
        className='messageInput'
        placeholder='Message...'
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />
      <button className="sendMsgBtn" onClick={sendMessage}>
        Send Message
      </button>
    </div>
  );
};

export default SendMessage;