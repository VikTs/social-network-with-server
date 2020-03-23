const { Router } = require("express");
const router = Router();
const User = require("../models/UserModel");
const Notification = require("../models/NotificationModel");
let ObjectId = require("mongodb").ObjectId;
//const config = require('config');

//  /notification/like - post
// {myId, userId, postId, isLiked}
router.post("/newLike", async (req, res) => {
  try {
    //  resultCode=1 - myId=userId  `I liked me`

    const myId = req.body.myId;
    const userId = req.body.userId;
    const postId = req.body.postId;
    const isLiked = req.body.isLiked;

    // const user = new User({email, password:hashedPassword})
    // await user.save()

    // const link = new Link({
    //     code, to, from, owner: req.user.userId })
    //   await link.save()

    //const link = await Link.findById(req.params.id)

    // model link --- owner: {type: Types.ObjectId, ref:'User'}
    // model user --- links: [{type:Types.ObjectId, ref:'Link'}]

    //const notificationsData = await Notification.findOne({ owner: new ObjectId(myId) })
    const newNotificationInfo = {
      userId,
      postId,
      isLiked
    };
    let update = Notification.updateOne(
      { owner: new ObjectId(myId) },
      { $push: { likesNotification: newNotificationInfo } },
      function(err) {
        if (err) return console.log(err);
      }
    );

    if (update) {
      const likedUserData = await User.findOne({ _id: new ObjectId(userId) });
      let newNotification = {
        userName: likedUserData.name,
        userSurname: likedUserData.surname
      };
      res
        .status(201)
        .json({
          message: "Notification was created",
          resultCode: 0,
          newNotification
        });
    }

    //res.status(201).json({ link })

    // console.log('req.body',req.body)
    // if(myId == userId) {
    //     res.json({"resultCode":1});
    // }
  } catch (error) {
    res.status(500).json({
      message: `Something wrong: notification was not created: ${error}`
    });
  }
});

module.exports = router;
