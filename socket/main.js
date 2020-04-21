const socketio = require('socket.io');
const mongoose = require('mongoose');
// // calling mongoose models
require('../models/Chat/ChatModel');
require('../models/Chat/MessageModel');
require('../models/Chat/MessageStatusModel');

const chatModel = mongoose.model('Chat');
const messageModel = mongoose.model('Message');
const messageStatusModel = mongoose.model('MessageStatus');

// Socket.io code for chat... 
module.exports.sockets = function (http) {
  var io = socketio.listen(http).sockets;

  io.on('connection', (socket) => {
    console.log('Connected user to socket io with id', socket.id);
    socket.on("disconnect", () => {
      console.log("Disconnected")
    })


    socket.on('chat message', async (msg) => {

      // Server - Client
      // const chats = await chatModel.find();
      // io.emit('output', chats);

      chatModel.watch().
      on('change', data => io.emit('output', data));



    // Client - Server
    //   const chat = new chatModel({
    //     chatName: 'chatName',
    //     chatDescription: 'chatDescription',
    //     membersId: [],
    //     context: msg,
    //     dateCreate: new Date(),
    //     // ownerId: { type: Types.ObjectId, ref: "User" }
    //   });
  
    // chat.save();


    console.log('message: ' + msg);
  });
    
  });


  return io;
};