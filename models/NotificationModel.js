// создаем модель - взаимодействие с пользователем
const { Schema, model, Types } = require("mongoose");
// !!!!!! Types.ObjectId -  СВЯЗЬ ПОЛЬЗОВАТЕЛЬ - ЕГО ССЫЛКИ  !!!!!!

const schema = new Schema({
  //создаем схему
  likesNotification: [
    {
      userId: String,
      userName: String,
      userSurname: String,
      postId: String,
      isLiked: Boolean,
      postInfo: {
        likesPeopleId: Array,
        _id: String,
        name: String,
        likesCount: Number
      }
    }
  ],
  friendNotificationRequest: [
    {
      userId: String,
      userName: String,
      userSurname: String
    }
  ],
  friendNotificationResponse: [
    {
      userId: String,
      userName: String,
      userSurname: String
    }
  ],
  friendNotificationDeleteRequest: [
    {
      userId: String,
      userName: String,
      userSurname: String
    }
  ],
  newNotificationsCount: Number,
  owner: { type: Types.ObjectId, ref: "User" } 
});

module.exports = model("Notification", schema); // экспортируем из файла результат работы ф-ии model
// название модели - User, её схема - schema
