const socketio = require('socket.io');
const mongoose = require('mongoose');
// // calling mongoose models
require('../models/Chat/ChatModel');
require('../models/Chat/MessageModel');

// const chatModel = mongoose.model('Chat');
const messageModel = mongoose.model('Message');


module.exports.sockets = function (http) {
  var io = socketio.listen(http).sockets;

  io.on('connection', (socket) => {
    console.log('Connected user to socket io with id', socket.id);
    socket.on("disconnect", () => {
      console.log("Disconnected")
    });

    

    /////////////////////MESSAGES/////////////////////////////
    
    // const changeStream = messageModel.watch();

    // changeStream.on('change', (change) => {
    //   io.emit('output', change);
    // });






    //   socket.on('chat message', async (msg) => {
    //     // Server - Client
    //     // const chats = await chatModel.find();
    //     // io.emit('output', chats);

    // });

  });

  return io;
};