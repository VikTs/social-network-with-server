const { Router } = require("express");
const router = Router();
const User = require("../models/UserModel");
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

    const userData = await User.findOne({ _id: new ObjectId(userId) });

    const myData = await User.findOne({ _id: new ObjectId(myId) });
    const myName = myData.name;
    const mySurname = myData.surname;

    let postInfo = userData.posts.find(post => { ///!!!
      if (post._id == postId) return post;
    });

    const newNotificationInfo = {
      //userId,
      userId: myId,///!!!
      userName: myName,
      userSurname: mySurname,
      postId,
      isLiked,
      postInfo: postInfo
    };
    let update = Notification.updateOne(
      { owner: new ObjectId(userId) },///!!!
      {
        $push: { likesNotification: newNotificationInfo },
        $inc: { newNotificationsCount: 1 }
      },
      function(err) {
        if (err) return console.log(err);
      }
    );

    if (update) {
      res.status(201).json({
        message: "Notification was created",
        resultCode: 0,
        newNotificationInfo
      });
    }
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

    // Return result
    res.status(200).json({
      message: "Notifications were get",
      resultCode: 0,
      likesNotification
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
      function(err) {
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
          addToFriendNotification: []
        }
      },
      function(err) {
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

module.exports = router;
