import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MatchesItem from './components/MatchesItem';
import Navbar from './components/NavBar';
import './stylesheets/Matches.css';

const Matches = ({ currUser, allUsers, setChat, socket }) => {
  const [userMatches, setUserMatches] = useState([]);
  const navigate = useNavigate();
  const slideDms = () => {
    // setChat({user: room});
    let username = currUser;
    let room = 'presentation';
    if (room !== '' && username !== '') {
      socket.emit('join', {username, room} );
    }
//:JOIN:Client Supplied Room
// socket.on('subscribe',function(room){  
//   try{
//     console.log('[socket]','join room :',room)
//     socket.join(room);
//     socket.to(room).emit('user joined', socket.id);
//   }catch(e){
//     console.log('[error]','join room :',e);
//     socket.emit('error','couldnt perform requested action');
//   }
// })
    navigate('/Messages', {replace: true});
  };

  useEffect(() => {
    fetch(`/api/${currUser}`)
      .then((data) => data.json())
      .then((data) => {
        //allUser contains all user profiles, el is another users profile
        const matchesArr = allUsers.filter((el) => {
          if (
            data.matches[el.username] === 'yes' &&
            el.matches[currUser] === 'yes'
          )
            return true;
        });
        const matchesItemsArr = matchesArr.map((el) => {
          return <MatchesItem key={el._id} user={el} slideDms={slideDms}/>;
        });

        setUserMatches(matchesItemsArr);
      });
  }, []);



  return (
    <div>
      <Navbar />
      <h1 className='MyMatches'>My Matches</h1>
      <div className='MainMatchesContainer'>{userMatches}</div>
    </div>
  );
};

export default Matches;
