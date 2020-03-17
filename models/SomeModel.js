// создаем модель - взаимодействие с пользователем
const {Schema, model, Types} = require('mongoose') 
// !!!!!! Types.ObjectId -  СВЯЗЬ ПОЛЬЗОВАТЕЛЬ - ЕГО ССЫЛКИ  !!!!!!

const schema = new Schema({ //создаем схему
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    owner: [{type:Types.ObjectId, ref:'User'}] //Link - модель,к которой мы привязываемся
})

module.exports = model('Notifications', schema) // экспортируем из файла результат работы ф-ии model
// название модели - User, её схема - schema