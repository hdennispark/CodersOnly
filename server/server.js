const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const port = 3000;
const apiRouter = require('./api.js');
const { SocketAddress } = require('net');
const Noodle = require('./noodleModel');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(
  'mongodb+srv://jchen0903:ilovecodesmith@cluster0.wjuijhf.mongodb.net/FoodTinder?retryWrites=true&w=majority'
);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST'],
  },
});

const CHAT_BOT = 'ChatBot'; // add this listen for when the client connects via socket.io-client
let chatRoom = '';
let allUsers = [];

// Listen for when the client connects via socket.io-client
io.on('connection', (socket) => {
  // console.log(`line 34 in serverjs: User connected ${socket.id}`);

  // Add this
  // Add a user to a room
  socket.on('join', async (data) => {
    const { username, room } = await data; // Data sent from client when join_room event emitted
    console.log('user: ', username);
    console.log('room: ', room);
    socket.join(room); // Join the user to a socket room

    let __createtime__ = Date.now(); // current timestamp
    // send message to all users currently in the room, apart from the user that just joined
    socket.to(room).emit('receive_message', {
      message: `${username} has joined the chat room`,
      username: CHAT_BOT,
      __createtime__,
    });

    // Save the new user to the room
    chatRoom = room;
    allUsers.push({ id: socket.id, username, room });
    chatRoomUsers = allUsers.filter((user) => user.room === room);
    socket.broadcast.emit('chatroom_users', chatRoomUsers);
    socket.emit('chatroom_users', chatRoomUsers);
  });

  // io.in('test').emit('message', 'cool game'); //sending to all clients in 'game' room(channel), include sender
  
  // socket.on('load', async (data) => {
  //   const { message, username, room, __createdtime__} = data;
  //   const chatDetails = await Noodle.find({room: 'present'});
  //   io.to(room).emit('load', chatDetails);
  //   console.log('finished loading')
  // })


  socket.on('send_message', async (data) => {
    const { message, username, room, __createdtime__ } = await data;
    io.to(room).emit('receive_message', data); // Send to all users in room, including sender
    // console.log(`line 61 in server.js `, data.message)
    const messageNoodle = Noodle.create({
      message,
      username,
      room,
      __createdtime__,
    })

      // harperSaveMessage(message, username, room, __createdtime__) // Save messagne in db
      .then((response) => console.log(`line 69 response `, response))
      .catch((err) => console.log(err));
  });

  socket.on('disconnect', () => {
    // console.log('User disconnected from the chat');
    const user = allUsers.find((user) => user.id == socket.id);
    if (user?.username) {
      allUsers = leaveRoom(socket.id, allUsers);
      socket.to(chatRoom).emit('chatroom_users', allUsers);
      socket.to(chatRoom).emit('receive_message', {
        message: `${user.username} has disconnected from the chat.`,
      });
    }
  });
});







server.listen(3000, () => 'Server is running on port 3000');

app.use('/api', apiRouter);

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  // console.log(errorObj.log); 
  return res.status(errorObj.status).json(errorObj.message);
});



module.exports = app;


