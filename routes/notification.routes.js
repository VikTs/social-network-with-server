const { Router } = require('express')
const router = Router() //create router
const User = require('../models/UserModel'); //подключаем модель
var ObjectId = require('mongodb').ObjectId;
const config = require('config'); //берет данные из файла config/default.json


//  /notification/like - post
router.post(
    '/like',
    async (req, res) => {
        try {
            console.log(req.body)
            

            res.json({"resultCode":0});

            res.status(200).json({ message: 'The user userId was followed' })
        } catch (error) {
            res.status(500).json({ message: 'Something wrong: user cannot be followed' })
        }
    })

//  /users/follow - delete 
    router.delete(
        '/follow/:userId',
        async (req, res) => {
            try {
                
    
                res.json({"resultCode":0});

                res.status(200).json({ message: 'The user userId was unfollowed' })
            } catch (error) {
                res.status(500).json({ message: 'Something wrong: user cannot be unfollowed' })
            }
        })

module.exports = router 