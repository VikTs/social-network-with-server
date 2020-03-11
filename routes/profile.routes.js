const { Router } = require('express')
const router = Router() //create router
const User = require('../models/UserModel'); //подключаем модель
var ObjectId = require('mongodb').ObjectId;
const config = require('config'); //берет данные из файла config/default.json
var jwtDecode = require('jwt-decode');


// /api/profile - конкатинируем с этим путем => /api/profile/status/:id
router.get(
    '/status/:id',
    async (req, res) => {
        try {
            const myData = await User.findOne({ _id: new ObjectId(req.params.id) })
            const status = myData.status

            res.json(status)
            res.status(200).json({ message: 'Status was loaded' }) //когда создали пользователя - сообщаем об этом fronend-y
        } catch (error) {
            res.status(500).json({ message: 'Something wrong: status wasn`t loaded' }) //500-ошибка сервера, json кидает сообщение
        }
    })


router.put(
    '/status',
    async (req, res) => {
        try {
            let decoded = jwtDecode(req.body.userData);
            User.findByIdAndUpdate(decoded.userID, { status: req.body.status },
                function (err) {
                    if (err) return console.log(err);
                    res.status(200).json({ message: 'Status was updated', resultCode: 0 })
                });

        } catch (error) {
            res.status(500).json({ message: 'Something wrong: Status wasn`t be updated' }) //500-ошибка сервера, json кидает сообщение
        }
    })

router.get(
    '/:id',
    async (req, res) => {
        try {
            const myData = await User.findOne({ _id: new ObjectId(req.params.id) })

            res.json(myData)
            res.status(200).json({ message: 'Profile was loaded' })
        } catch (error) {
            res.status(500).json({ message: 'Something wrong: profile wasn`t be loaded' })
        }
    })

router.put(
    '/photo',
    async (req, res) => {
        try {
            console.log(req.params.page)
            // const myData = await User.findOne({ _id: new ObjectId(req.params.id) })

            // res.json(myData)
            res.status(200).json({ message: 'Main image was loaded' })
        } catch (error) {
            res.status(500).json({ message: 'Something wrong: main image wasn`t be loaded' })
        }
    })

module.exports = router // export router from model