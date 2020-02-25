// // создаем модель - взаимодействие с пользователем
// const {Schema, model, Types} = require('mongoose') 
// // !!!!!! Types.ObjectId -  СВЯЗЬ ПОЛЬЗОВАТЕЛЬ - ЕГО ССЫЛКИ  !!!!!!

// const schema = new Schema({ //создаем схему
//     email: {type: String, required: true, unique: true},
//     password: {type: String, required: true}
//     //links: [{type:Types.ObjectId, ref:'Link'}] //Link - модель,к которой мы привязываемся
// })

// module.exports = model('Login', schema) // экспортируем из файла результат работы ф-ии model
// // название модели - User, её схема - schema