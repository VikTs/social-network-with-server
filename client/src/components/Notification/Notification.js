import React from "react";
import style from "./Notification.module.css";
import { NavLink } from "react-router-dom";

class Notifications extends React.Component {
  componentDidMount() {
    this.props.getNotificationList();
    //this.props.zeroingNotificationsCount();
  }

  componentWillUnmount() {
    this.props.zeroingNotificationsCount();
  }

  render() {
    // console.log('this.props.likesNotification',this.props.likesNotification);
    let likes = this.props.likesNotification
      .map((n, i) => {
        return (
          <NotificationLike
            key={i}
            postInfo={n.postInfo}
            userName={n.userName}
            userSurname={n.userSurname}
            isLiked={n.isLiked}
            isNew={i >= this.props.likesNotification.length - this.props.newNotificationsCount}
          />
        );
      })
      .reverse();

    // console.log(this.props, 'this.props')

    let friendsRequest = this.props.friendNotificationRequest
      .map((n, i) => {
        return (
          <NotificationFriend
            key={i}
            userName={n.userName}
            userSurname={n.userSurname}
            userId={n.userId}
            text='want to be your friend'
          />
        );
      })
      .reverse();

    let friendsDeleteRequest = this.props.friendNotificationDeleteRequest
      .map((n, i) => {
        return (
          <NotificationFriend
            key={i}
            userName={n.userName}
            userSurname={n.userSurname}
            userId={n.userId}
            text='removed his(her) request to friends'
          />
        );
      })
      .reverse();

    return (
      <div>
        <h1>Notifications:</h1>
        <p>You have {this.props.newNotificationsCount} new notifications</p>
        <button type="button" onClick={this.props.cleanAllNotifications}>
          Clean all notifications
        </button>
        <h2>Likes</h2>
        <div>{likes}</div>
        <h2>Friends Request</h2>
        <div>{friendsRequest}</div>
        <h2>Friends Delete Request</h2>
        <div>{friendsDeleteRequest}</div>
      </div>
    );
  }
}

const NotificationLike = props => {
  return (
    <div
      className={`${style.notificationBlock} 
    ${props.isNew ? style.isNew : style.isNotNew}`}
    >
      {props.isNew && <p class={style.newActionText}>New action!</p>}
      <p>
        User {props.userName} {props.userSurname}
      </p>
      {props.isLiked === true ? (
        <p>liked your post</p>
      ) : (
          <p>removed like from your post</p>
        )}
      <div className={style.item}>
        <img src="https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
        {props.postInfo.name}
      </div>
    </div>
  );
};

const NotificationFriend = ({ userName, userSurname, userId, text, ...props }) => {
  return (
    <div className={`${style.notificationBlock}`} >

      <p>
        <NavLink to={`/profiles/${userId}`}>
          {userName} {userSurname}
        </NavLink>
        {text}
      </p>

    </div>
  );
};

export default Notifications;
