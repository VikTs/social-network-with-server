const { Router } = require('express');
const router = Router();
const Chat = require('../models/Chat/ChatModel');
const Message = require('../models/Chat/MessageModel');
var ObjectId = require('mongodb').ObjectId;

// /message
router.post(
  '/message',
  async (req, res) => {
    try {

      const { chat_id, user_id, context, date_create } = req.body.newMessage;
      console.log(chat_id, user_id, context, date_create);

      const newMessage = new Message({
        context,
        date_create,
        chat_id,
        user_id,
      })
      const newMessageDB = await newMessage.save();

      res.status(200).json({ newMessage: newMessageDB })
    } catch (error) {
      res.status(500).json({ message: 'Something wrong: status wasn`t loaded' }) //500-ошибка сервера, json кидает сообщение
    }
  });

router.post(
  '/chat',
  async (req, res) => {
    try {
      const { id, members, chat_name, chat_description, date_create, owner_id } = req.body.newChat;

      const newChat = new Chat({
        chat_name,
        chat_description,
        members,
        date_create,
        owner_id,
      });
      const newChatDB = await newChat.save();

      res.status(200).json({ newChat: newChatDB });
    } catch (error) {
      res.status(500).json({ message: `Something wrong: ${error}` });
    }
  });


router.get(
  '/chats/:id',
  async (req, res) => {
    try {
      const chats = await Chat.find({ members: { $elemMatch: { id: req.params.id } } });
      res.status(200).json({ chats });
    } catch (error) {
      res.status(500).json({ message: `Something wrong: ${error}` });
    }
  })

router.get(
  '/messages/:id',
  async (req, res) => {
    try {
      const chats = await Chat.find({ members: { $elemMatch: { id: req.params.id } } });
      const chatsIdList = chats.map(chat => chat.id);
      const messages = await Message.find();
      const messagesFromMyChats = messages.filter(mess => chatsIdList.includes(`${mess.chat_id}`));
      res.status(200).json({ messages: messagesFromMyChats });
    } catch (error) {
      res.status(500).json({ message: `Something wrong: ${error}` });
    }
  })

router.put(
  '/chats/member',
  async (req, res) => {
    try {
      const { newMember, chatId } = req.body;

      Chat.updateOne(
        { _id: new ObjectId(chatId) },
        { $addToSet: { members: newMember } },
        function (err) {
          if (err) return console.log(err);
          res.status(200).json({ message: 'Member was added' })
        }
      );

    } catch (error) {
      res.status(500).json({ message: `Something wrong: ${error}` });
    }
  });

router.delete(
  '/chats/:id',
  async (req, res) => {
    try {
      const { id } = req.params;

      await Chat.deleteOne({ _id: new ObjectId(id) });
      await Message.deleteMany({ chat_id: new ObjectId(id) });

      res.status(200).json({ message: `Chat and it's messages were deleted:` });
    } catch (error) {
      res.status(500).json({ message: `Something wrong: ${error}` });
    }
  });

  router.delete(
    '/chats/:chatid/:memberid',
    async (req, res) => {
      try {
        const { chatid, memberid } = req.params;
  
        Chat.updateOne(
          { _id: new ObjectId(chatid) },          
          { $pull: { members: { id: memberid } } },
          function (err) {
            if (err) return console.log(err);
            res.status(200).json({ message: 'Member from chat was deleted' })
          }
        );
  
      } catch (error) {
        res.status(500).json({ message: `Something wrong: ${error}` });
      }
    });

module.exports = router;
