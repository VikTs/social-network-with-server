const { Schema, model } = require('mongoose');

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
    friends: Array,
    myfollows: Array,
    subscribers: Array,
})

module.exports = model('User', schema) // экспортируем из файла результат работы ф-ии model
// название модели - User, её схема - schema