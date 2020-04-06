const { Router } = require('express')
const router = Router() //create router
const User = require('../models/UserModel'); //подключаем модель
var ObjectId = require('mongodb').ObjectId;
const config = require('config'); //берет данные из файла config/default.json

//  /users
router.get(
    '/',
    async (req, res) => {
        try {
            let searchParams = new URLSearchParams(req._parsedOriginalUrl.search);
            const currentPage = searchParams.get('page');
            const pageSize = searchParams.get('count');
            const myId = searchParams.get('id');

            const users = await User.find({});
            const me = await User.findOne({ _id: new ObjectId(myId) });
            let currentUsers = [];
            const myFriends = me.friends;
            const myfollows = me.myfollows;

            users.forEach((user, index) => {
                if (index >= ((currentPage - 1) * pageSize) &&
                    index < pageSize * currentPage &&
                    user._id != myId) {
                    if (myFriends.indexOf(user._id) != -1 ||
                        myfollows.indexOf(user._id) != -1) {
                        user = user.toObject();
                        user.followed = true;
                    }
                    currentUsers.push(user);
                }
            });

            res.json({ "items": currentUsers, "totalCount": users.length, "error": null });
            res.status(200).json({ message: 'Users were loaded' })
        } catch (error) {
            res.status(500).json({ message: 'Something wrong: users weren`t loaded' })
        }
    })

//  /users/follow - post
router.post(
    '/follow',
    async (req, res) => {
        try {

            const myId = req.body.myId;
            const userId = req.body.userId;

            //push him to my requests
            await User.updateOne(
                { _id: new ObjectId(myId) },
                { $push: { myfollows: userId } });

            //push me to his subscribers
            await User.updateOne(
                { _id: new ObjectId(userId) },
                { $push: { subscribers: myId } });


            res.status(200).json({ message: `The user ${userId} was followed`, resultCode: 0 })


        } catch (error) {
            res.status(500).json({ message: 'Something wrong: user cannot be followed' })
        }
    })

//  /users/follow - delete 
router.delete(
    '/follow',
    async (req, res) => {
        try {

            let searchParams = new URLSearchParams(req._parsedUrl.query);
            const userId = searchParams.get('userid');
            const myId = searchParams.get('myid');

            const myData = await User.findOne({ _id: new ObjectId(myId) });

            if (myData.myfollows.indexOf(userId) != -1) {
                await User.updateOne(
                    { _id: new ObjectId(myId) },
                    { $pull: { myfollows: userId } });
                await User.updateOne(
                    { _id: new ObjectId(userId) },
                    { $pull: { subscribers: myId } });
            }
            else if (myData.friends.indexOf(userId) != -1) {
                await User.updateOne(
                    { _id: new ObjectId(myId) },
                    { $pull: { friends: userId } });
                await User.updateOne(
                    { _id: new ObjectId(userId) },
                    { $pull: { friends: myId } });
            }
            else { res.status(403) } //////////

            res.status(200).json({ message: `The user ${userId} was unfollowed`, resultCode: 0 })


        } catch (error) {
            res.status(500).json({ message: `Something wrong: user cannot be unfollowed: ${error}` })
        }
    })

module.exports = router 