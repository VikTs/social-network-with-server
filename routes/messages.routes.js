// const { Router } = require('express')
// const router = Router() //create router
// const User = require('../models/UserModel'); //подключаем модель
// var ObjectId = require('mongodb').ObjectId;

// // /api/profile 
// router.post(
//     '/message',
//     async (req, res) => {
//         try {
//             // const myData = await User.findOne({ _id: new ObjectId(req.params.id) })
//             // const status = myData.status
//             console.log(req.body, 'req.body')

//             // res.json(status)
//             res.status(200).json({ message: 'Hello' }) //когда создали пользователя - сообщаем об этом fronend-y
//         } catch (error) {
//             res.status(500).json({ message: 'Something wrong: status wasn`t loaded' }) //500-ошибка сервера, json кидает сообщение
//         }
//     })