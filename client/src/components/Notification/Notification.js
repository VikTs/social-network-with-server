import React from "react";
import style from "./Notification.module.css";

class Notifications extends React.Component {
  componentDidMount() {
    //this.props.getNotificationList({})
    // console.log(this.props.posts);
  }

  componentWillUnmount() {
    this.props.zeroingNotificationsCount();
  }

  render() {
    let notifications = this.props.likesNotification.map((n, i) => {
      let postInfo = this.props.posts.filter(p => {
        if (p._id == n.postId) return p;
      });
      //console.log('postInfo',postInfo);
      return (
        <Notification
          key={i}
          postInfo={postInfo}
          userName={n.userName}
          userSurname={n.userSurname}
          isLiked={n.isLiked}
        />
      );
    });
    return (
      <div>
        <h1>Notifications:</h1>
        <p>You have {this.props.newNotificationsCount} new notifications</p>
        {notifications}
      </div>
    );
  }
}

const Notification = props => {
  //console.log(props.postInfo)
  return (
    <div className={style.notificationBlock}>
      <p>
        User {props.userName} {props.userSurname}
      </p>
      {props.isLiked === true ? (
        <p>liked your post</p>
      ) : (
        <p>removed like from your post</p>
      )}
      {/* <p> {props.postInfo[0].name}</p> */}
      <div className={style.item}>
        <img src="https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
        {props.postInfo[0].name}
      </div>
    </div>
  );
};
export default Notifications;
