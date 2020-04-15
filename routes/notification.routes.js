const { Router } = require("express");
const router = Router();
const User = require("../models/UserModel");
const Post = require("../models/PostModel");
const Notification = require("../models/NotificationModel");
let ObjectId = require("mongodb").ObjectId;

//  /notification/like - post
// {myId, userId, postId, isLiked}
router.post("/newLike", async (req, res) => {
  try {
    const myId = req.body.myId;
    const userId = req.body.userId;
    const postId = req.body.postId;
    const isLiked = req.body.isLiked;

    const postData = await Post.findOne({ owner: new ObjectId(userId) });
    const myData = await User.findOne({ _id: new ObjectId(myId) });
    const myName = myData.name;
    const mySurname = myData.surname;

    let postInfo = postData.posts.find(post => {
      if (post._id == postId) return post;
    });

    const newNotificationInfo = {
      userId: myId,
      userName: myName,
      userSurname: mySurname,
      postId,
      isLiked,
      postInfo: postInfo
    };
    let update = await Notification.updateOne(
      { owner: new ObjectId(userId) },
      {
        $push: { likesNotification: newNotificationInfo },
        $inc: { newNotificationsCount: 1 }
      },
      function (err) {
        if (err) return console.log(err);
      }
    );

    res.status(201).json({
      message: "Notification was created",
      resultCode: 0,
      newNotificationInfo
    });

  } catch (error) {
    res.status(500).json({
      message: `Something wrong: notification was not created: ${error}`
    });
  }
});

// /notification/getAll/{myId}  -  get
router.get("/getList/:id", async (req, res) => {
  try {
    const myId = req.params.id;

    //Get likes notifications
    const notificationData = await Notification.findOne({
      owner: new ObjectId(myId)
    });
    const likesNotification = notificationData.likesNotification;
    const friendNotificationRequest = notificationData.friendNotificationRequest;
    const friendNotificationDeleteRequest = notificationData.friendNotificationDeleteRequest;
    const friendNotificationResponse = notificationData.friendNotificationResponse;
    const newNotificationsCount = notificationData.newNotificationsCount;

    // Return result
    res.status(200).json({
      message: "Notifications were get",
      resultCode: 0,
      likesNotification,
      friendNotificationRequest,
      friendNotificationResponse,
      friendNotificationDeleteRequest,
      newNotificationsCount
    });
  } catch (error) {
    res.status(500).json({
      message: `Something wrong: notifications were not get: ${error}`
    });
  }
});

// /notification/getAll/{myId}  -  get
router.get("/getNewCount/:id", async (req, res) => {
  try {
    const myId = req.params.id;

    //Get likes notifications
    const notificationData = await Notification.findOne({
      owner: new ObjectId(myId)
    });
    const newCount = notificationData.newNotificationsCount;

    // Return result
    res.status(200).json({
      message: "Notifications count was get",
      resultCode: 0,
      newCount
    });
  } catch (error) {
    res.status(500).json({
      message: `Something wrong: notifications count was not get: ${error}`
    });
  }
});

// /notification/zeroingNew/{myId}  -  delete
router.delete("/zeroingNew/:id", async (req, res) => {
  try {
    const myId = req.params.id;
    //Update new notifications count (=0)
    Notification.updateOne(
      { owner: new ObjectId(myId) },
      { $set: { newNotificationsCount: 0 } },
      function (err) {
        if (err) return console.log(err);
        res.status(200).json({
          message: "Notifications count was zeroing",
          resultCode: 0
        });
      }
    );
  } catch (error) {
    res.status(500).json({
      message: `Something wrong: notifications count was not zeroing: ${error}`
    });
  }
});

// /notification/{myId}  -  delete
router.delete("/:id", async (req, res) => {
  try {
    const myId = req.params.id;
    //Delete all notifications
    let update = Notification.updateOne(
      { owner: new ObjectId(myId) },
      {
        $set: {
          newNotificationsCount: 0,
          likesNotification: [],
          friendNotificationRequest: [],
          friendNotificationResponse: [],
        }
      },
      function (err) {
        console.log(myId, "myId");
        if (err) return console.log(err);
        res.status(200).json({
          message: "Notifications was delete",
          resultCode: 0
        });
      }
    );
  } catch (error) {
    res.status(500).json({
      message: `Something wrong: notifications was not delete: ${error}`
    });
  }
});

// addReqFriendNotification - post
router.post("/friendreq", async (req, res) => {
  try {
    const myId = req.body.myId;
    const userId = req.body.userId;

    const myData = await User.findOne({ _id: new ObjectId(myId) });

    await Notification.updateOne(
      { owner: new ObjectId(userId) },
      {
        $push: { friendNotificationRequest: { userId: myId, userName: myData.name, userSurname: myData.surname } },
        $inc: { newNotificationsCount: 1 }
      }
    );

    res.status(200).json({ message: "The request to friends was sent", resultCode: 0 });

  } catch (error) {
    res.status(500).json({
      message: `Something wrong with request to friends: ${error}`
    });
  }
});

// removeReqFriendNotification - delete
router.delete("/friendreq/:myid/:userid", async (req, res) => {
  try {
    const myId = req.params.myid;
    const userId = req.params.userid;
    const myData = await User.findOne({ _id: new ObjectId(myId) });

    await Notification.updateOne(
      { owner: new ObjectId(userId) },
      {
        $push: { friendNotificationDeleteRequest: { userId: myId, userName: myData.name, userSurname: myData.surname  }} ,
        $inc: { newNotificationsCount: 1 }
      }
    );
    res.status(200).json({ message: "The request to friends was delete", resultCode: 0 });

  } catch (error) {
    res.status(500).json({
      message: `Something wrong with deleting request to friends: ${error}`
    });
  }
});

module.exports = router;
