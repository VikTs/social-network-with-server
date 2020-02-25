const { Router } = require('express')
const router = Router() //create router
const User = require('../models/UserModel'); //подключаем модель
// const SomeModel = require('../models/SomeModel'); //подключаем модель
const bcrypt = require('bcryptjs'); // хэширует и сравнивает пароли
const { check, validationResult } = require('express-validator'); //проверка правильности ввода на сервере
var jwtDecode = require('jwt-decode');
var ObjectId = require('mongodb').ObjectId;

//token используется для передачи данных для аутентификации в клиент-серверных приложениях. 
//Токены создаются сервером, подписываются секретным ключом и передаются клиенту, 
//который в дальнейшем использует данный токен для подтверждения своей личности

const jwt = require('jsonwebtoken'); // подключаем jsonwebtoken в переменную
const config = require('config'); //берет данные из файла config/default.json

// api/auth - конкатинируем с этим путем => api/auth/register
router.post(
    '/register', //путь

    //ПРОВЕРКА ПРИШЕДШИХ ДАННЫХ, АНАЛОГ СЕРВЛЕТА -?
    [ //массив из middleware для валидации
        check('email', 'Uncorrect email').isEmail(), //проверка поля email, сообщение ошибки, встроенная ф-я проверки мейла
        check('password', 'Min len - 6 symbols').isLength({ min: 6 })
    ],

    async (req, res) => { //ф-я       
        try {
            const errors = validationResult(req); // экспресс валидирует входящие поля

            if (!errors.isEmpty()) { // если есть ошибки
                return res.status(400).json({ // возвращаем на фронтэнд, 400 - ошибка
                    errors: errors.array(), //передаем errors м приводим его к массиву
                    message: 'Uncorrect data (registration)'
                })
            }

            const { email, password, name, surname, age, city, facebook, youtube } = req.body // получаем логин и пароль из запроса

            const candidate = await User.findOne({ email: email }) //поиск, зарегистрирован ли пользователь
            if (candidate) { // если уже существует
                return res.status(400).json({ message: 'This user is exist' })
            }

            // ШИФРУЕМ ПАРОЛЬ

            const hashedPassword = await bcrypt.hash(password, 12) //передача "12" чтобы сильней зашифровать
            const user = new User({
                email, password: hashedPassword,
                name, surname, age, city,
                facebook, youtube
            }) //создаем нового пользователя (с помощью модели)

            await user.save() //ждём, пока пользователь сохраниться

            const token = createToken(user.id, user.email, user.name)
            res.json({ token, resultCode: 0 })

            res.status(201).json({ message: 'User created' }) //когда создали пользователя - сообщаем об этом fronend-y
        } catch (error) {
            res.status(500).json({ message: 'Something wrong' }) //500-ошибка сервера, json кидает сообщение
        }
    })

// api/auth/me
router.post(
    '/me',
    async (req, res) => {
        try {

            if (req.body.userData) {
                let decoded = jwtDecode(req.body.userData);
                res.json({
                    id: decoded.userID,
                    email: decoded.userEmail,
                    login: decoded.userLogin,
                    resultCode: 0
                })
            } else {
                res.json({ resultCode: -1 })
            }
        } catch (error) {
            res.status(500).json({ message: 'Something wrong' }) //500-ошибка сервера, json кидает сообщение
        }
    })


// api/auth/login
router.post(
    '/login',
    [ //массив из middleware для валидации
        check('email', 'Enter correct').normalizeEmail().isEmail(), //приводим к нормальному мейлу и проверяем
        check('password', 'Enter password').exists() // пароль должен существовать
    ],
    async (req, res) => {
        try {

            const errors = validationResult(req); // экспресс валидирует входящие поля

            if (!errors.isEmpty()) { // если есть ошибки
                return res.status(400).json({ // возвращаем на фронтэнд, 400 - ошибка
                    errors: errors.array(), //передаем errors м приводим его к массиву
                    message: 'Uncorrect data (enter to system)'
                })
            }

            const { email, password } = req.body // получаем логин и пароль из запроса
            const user = await User.findOne({ email: email }) //поиск, существует ли пользователь
            if (!user) { // если не существует
                return res.status(400).json({ message: 'User wasn`t found' })
            }

            // Нашли пользователя
            const isMatch = await bcrypt.compare(password, user.password) //сравниваем введенный пароль и пароль из базы 
            if (!isMatch) { //если пароли не совпадают
                return res.status(400).json({ message: 'Uncorrect password' })
            }

            const token = createToken(user.id, user.email, user.name)
            res.json({ token, resultCode: 0 })

        } catch (error) {
            res.status(500).json({ message: 'Something wrong' })
        }
    }
)

// api/auth/login (logout)
router.delete(
    '/login',
    async (req, res) => {
        try {
            res.json({ resultCode: 0 })
        } catch (error) {
            res.status(500).json({ message: 'Something wrong' })
        }
    }
)

// api/auth/login (logout)
router.post(
    '/deletePage',
    async (req, res) => {
        try {

            const query = { _id: new ObjectId(req.body.userId) };

            User.deleteOne(query)
                .then(result => console.log(`Deleted ${result.deletedCount} user.`))
                .catch(err => console.error(`Delete failed with error: ${err}`))

            res.json({ resultCode: 0 })


        } catch (error) {
            res.status(500).json({ message: 'Something wrong' })
        }
    }
)


const createToken = (id, email, login) => {
    return jwt.sign( //создаем token
        {
            userID: id,
            userEmail: email,
            userLogin: login
        },
        config.get('jwtSecret'),
        { expiresIn: '1h' }
    )
}

module.exports = router // export router from model