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
            console.log(req.body)
            User.findByIdAndUpdate(req.body.userId, { status: req.body.status },
                function (err) {
                    if (err) return console.log(err);
                    res.status(200).json({ message: 'Status was updated', resultCode: 0 })
                });

        } catch (error) {
            res.status(500).json({ message: `Something wrong: Status wasn't be updated: ${error}` }) //500-ошибка сервера, json кидает сообщение
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
            res.status(500).json({ message: `Something wrong: profile wasn't be loaded: ${error}` })
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

            User.findByIdAndUpdate(req.body.userId, { $push: { posts: newPost } },
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
    '/posts/:userId/:myId',
    async (req, res) => {
        try {
            //console.log(req.params.myId)
            const userInfo = await User.findOne({ _id: new ObjectId(req.params.userId) })

            //isLikedByMe
            let posts = userInfo.posts.map(post => {
                post = post.toObject();
                if(post.likesPeopleId.includes(req.params.myId)) {                    
                    post.isLiked = true;                    
                    return post
                } else {
                    post.isLiked = false; 
                    return post
                }
            })

            res.status(200).json({ message: 'Get posts sucsess', resultCode: 0, posts: posts })

        } catch (error) {
            
            res.status(500).json({ message: `Something wrong: 'Get posts error': ${error}` })
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
            let likedPost = userWasLikedData.posts.find(
                (post) => { if (post._id == postId) { return post } })

            //find if user liked this post before
            let likesPeopleList = likedPost.likesPeopleId;
            let isLiked = likesPeopleList.indexOf(myId);
            if (isLiked == -1) { likesPeopleList.push(myId); isLiked = 1 }
            else { likesPeopleList.pop(myId); isLiked = 0 }

            // calculate likes count
            likedPost.likesCount = likesPeopleList.length;
            
            // add isLiked by me field 
            likedPost = likedPost.toObject();
            likedPost.isLiked = !!isLiked

            //send new values to mongo
            User.findByIdAndUpdate(userId,
                { $set: { posts: userWasLikedData.posts } },
                function (err) {
                    if (err) return console.log(err);
                    res.status(200).json({ message: 'The post was liked', updatedPost: likedPost })
                });

        } catch (error) {
            res.status(500).json({ message: `Something wrong: The post was not be liked ${error}` })
        }
    })


module.exports = router // export router from model