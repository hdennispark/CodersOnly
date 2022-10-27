import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SendMessage from './SendMessage';
import '../stylesheets/Messages.css';

const Messages = ({currUser, room, socket}) => {
    const [messagesReceived, setMessagesReceived] = useState([]);
    const messagesColumnRef = useRef(null);
    const navigate = useNavigate();
    room = 'presentation'

    function sortMessagesByDate(messages) {
        return messages.sort(
            (a, b) => parseInt(a.__createdtime__) - parseInt(b.__createdtime__)
        );
    }

    function formatDateFromTimestamp(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleString();
    }
    useEffect(() => {
        fetch('/api/load')
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            let chatHistory = sortMessagesByDate(data);
            setMessagesReceived([...chatHistory]);
        })
    }, [])

    const backToMatches = () => {
        navigate('/Matches', {replace: true});
    }

    useEffect(() => {
        socket.on('receive_message', (data) => {
            // console.log(data);
            messagesColumnRef.current.scrollTop =
          messagesColumnRef.current.scrollHeight;

            setMessagesReceived((state) => [
                ...state,
                {
                    message: data.message,
                    username: data.username,
                    __createdtime__: data.__createdtime__,
                },
            ]);
        });

        return () => socket.off('receive_message');
    }, [socket, messagesReceived]); //tells react to ignore the re-rendering if state is not changed (for optimization)


        // socket.on('load', async (data) => {
        //     // data = await JSON.parse(data);
        //     console.log('line 37 data: ', data)
        //     let chatHistory = sortMessagesByDate(data);
        //     console.log('chatHistory line 39: ', chatHistory)
        //     setMessagesReceived((state) => [...chatHistory, ...state]);
        // });
        
        // return () => socket.off('load');
  

    // useEffect(() => {
    //     messagesColumnRef.current.scrollTop =
    //       messagesColumnRef.current.scrollHeight;
    //   }, [messagesReceived]);
    

    // this will just create a single column chat root rather than a left right sender receiver dynamic
    // can can iterate through messagesReceived array to create a message array of received and sent message components and render those instead
    return (
        <div>
            <button className='backBtn' onClick={() => backToMatches()} >Back</button>
            <div className='messagesColumn' ref={messagesColumnRef}>
                {messagesReceived.map((msg, i) => (
                    <div className='message' key={i}>
                        <div className='msgMeta'>{msg.username}</div>
                        <div className='msgText'>{msg.message}</div>
                        <div className='msgMetaTime'>{formatDateFromTimestamp(msg.__createdtime__)}</div>
                    </div>
                ))}
            </div>
            <SendMessage username={currUser} room={room} socket={socket}/>
        </div>
    )
}

export default Messages;