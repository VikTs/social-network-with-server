const { Router } = require('express')
const router = Router() //create router
const User = require('../models/UserModel'); //подключаем модель
var ObjectId = require('mongodb').ObjectId;
const config = require('config'); //берет данные из файла config/default.json

// /api/profile - конкатинируем с этим путем => /api/profile/register
router.get(
    '/status/:id', 

    async (req, res) => { 
        try {
            const myData = await User.findOne({ _id: new ObjectId(req.params.id) })
            const status = myData.status
            
            res.json({ status, resultCode: 0 })
            res.status(200).json({ message: 'Status was loaded' }) //когда создали пользователя - сообщаем об этом fronend-y
        } catch (error) {
            res.status(500).json({ message: 'Something wrong' }) //500-ошибка сервера, json кидает сообщение
        }
    })

module.exports = router // export router from model