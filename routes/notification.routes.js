const { Router } = require('express')
const router = Router()
const User = require('../models/UserModel');
const Notification = require('../models/NotificationModel');
//let ObjectId = require('mongodb').ObjectId;
//const config = require('config'); 

//  /notification/like - post
// {myId, userId, postId, isLiked}
router.post(
    '/like',
    async (req, res) => {
        try {

            //  resultCode=1 - myId=userId  `I liked me`

            const myId = req.body.myId
            const userId = req.body.userId
            const postId = req.body.postId
            const isLiked = req.body.isLiked

            console.log('req.body',req.body)
            if(myId == userId) {
                res.json({"resultCode":1});
            }


            
           

            res.json({"resultCode":0});

            res.status(200).json({ message: 'The user userId was followed' })
        } catch (error) {
            res.status(500).json({ message: 'Something wrong: user cannot be followed' })
        }
    })


module.exports = router 