// создаем модель - взаимодействие с пользователем
const { Schema, model, Types } = require('mongoose') //работа с mongoose, import
// !!!!!! Types.ObjectId -  СВЯЗЬ ПОЛЬЗОВАТЕЛЬ - ЕГО ССЫЛКИ  !!!!!!

const schema = new Schema({ //создаем схему
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    surname: { type: String },
    age: { type: Number },
    city: { type: String },
    country: { type: String },
    contacts: {
        facebook: { type: String },
        youtube: { type: String }
    },
    photos: {
        small: { type: String },
        large: { type: String }
    },
    status: { type: String },
    aboutMe: { type: String },
    messages: [{ id: Number, message: String }],
    posts: [{
        id: Number, name: String, likesCount: Number,
        likesPeopleId: Array
    }],
    notifications: [{ type: Types.ObjectId, ref: 'Notifications' }] //Notifications - модель,к которой мы привязываемся
})

module.exports = model('User', schema) // экспортируем из файла результат работы ф-ии model
// название модели - User, её схема - schema