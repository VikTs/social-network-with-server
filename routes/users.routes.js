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
            console.log(searchParams.get('page'));
            console.log(searchParams.get('count'));

            const users = await User.find({})
            //const currentUsers = users.map()
            //console.log(users);

            res.json({"items": users, "totalCount": searchParams.get('count'), "error": null});

            res.status(200).json({ message: 'Users were loaded' })
        } catch (error) {
            res.status(500).json({ message: 'Something wrong: users weren`t loaded' })
        }
    })

module.exports = router 