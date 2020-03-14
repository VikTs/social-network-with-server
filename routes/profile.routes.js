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

// /profile/posts - put
router.put(
    '/posts',
    async (req, res) => {
        try {

            let decoded = jwtDecode(req.body.userData);

            let generateMongoId = function () {
                var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
                return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function () {
                    return (Math.random() * 16 | 0).toString(16);
                }).toLowerCase();
            };
            let postId = new ObjectId(generateMongoId())

            let newPost = {
                _id: postId,
                name: req.body.postText,
                likesCount: 0,
                likesPeopleId: []
            }

            User.findByIdAndUpdate(decoded.userID, { $push: { posts: newPost } },
                function (err) {
                    if (err) return console.log(err);
                    res.status(200).json({ message: 'Post was added', resultCode: 0, newPost: newPost })
                });



        } catch (error) {
            res.status(500).json({ message: `Something wrong: Post wasn't be added: ${error}` })
        }
    })


// /profile/posts - get
router.get(
    '/posts/:userId',
    async (req, res) => {
        try {
            const userInfo = await User.findOne({ _id: new ObjectId(req.params.userId) })
            res.status(200).json({ message: 'Get posts sucsess', resultCode: 0, posts: userInfo.posts })

        } catch (error) {
            res.status(500).json({ message: 'Get posts error' })
        }
    })

// /profile/posts - delete
router.delete(
    '/posts',
    async (req, res) => {
        try {
            let searchParams = new URLSearchParams(req._parsedUrl.search);
            const postId = searchParams.get('postId');
            let userId = searchParams.get('userId');

            User.findByIdAndUpdate(userId, { $pull: { posts: { _id: postId } } },
                function (err) {
                    if (err) return console.log(err);
                    res.status(200).json({ message: `Delete post ${postId} sucsess`, resultCode: 0 })
                });

        } catch (error) {
            res.status(500).json({ message: `Delete post error: ${error} ` })
        }
    })


// /posts/likes, { myId, userId, postId }
router.post(
    '/posts/likes',
    async (req, res) => {
        try {

            const myId = req.body.myId;
            const userId = req.body.userId;
            const postId = req.body.postId;

            // find user
            const userWasLikedData = await User.findOne({ _id: new ObjectId(userId) });
            //find post by id
            const likedPost = userWasLikedData.posts.find(
                (post) => { if (post._id == postId) { return post } })

            console.log(likedPost)

            //find if user liked this post before
            let likesPeopleList = likedPost.likesPeopleId;
            const isLiked = likesPeopleList.indexOf(myId);
            if (isLiked == -1) { likesPeopleList.push(myId) }
            else { likesPeopleList.pop(myId) }

            // calculate likes count
            let likesCount = likesPeopleList.length;

            //send new values to mongo
            // User.findByIdAndUpdate(userId, 
            //     {  posts: { likesCount: postId, likesPeopleId: likesPeopleList } },
            //     function (err) {
            //         if (err) return console.log(err);
            //         res.status(200).json({ message: 'The post was liked' })            //     });

            console.log(likesPeopleList, ' ', likesCount)



            res.status(200).json({ message: 'The post was liked' })
        } catch (error) {
            res.status(500).json({ message: `Something wrong: The post was not be liked ${error}` })
        }
    })


module.exports = router // export router from model