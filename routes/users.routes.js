const { Router } = require('express')
const router = Router() //create router
const User = require('../models/UserModel'); //подключаем модель
var ObjectId = require('mongodb').ObjectId;
const config = require('config'); //берет данные из файла config/default.json
var jwtDecode = require('jwt-decode');

//  /users
router.get(
    '/',
    async (req, res) => {
        try {
            let searchParams = new URLSearchParams(req._parsedOriginalUrl.search);
            const currentPage = searchParams.get('page');
            const pageSize = searchParams.get('count');

            const users = await User.find({});
            let currentUsers = [];

            users.forEach((user, index)=>{
                if(index>=((currentPage-1)*pageSize)&&index<pageSize*currentPage){
                    currentUsers.push(user);}
            });

            res.json({"items": currentUsers, "totalCount": users.length, "error": null});

            res.status(200).json({ message: 'Users were loaded' })
        } catch (error) {
            res.status(500).json({ message: 'Something wrong: users weren`t loaded' })
        }
    })

module.exports = router 