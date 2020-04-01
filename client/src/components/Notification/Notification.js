import React from "react";
import style from "./Notification.module.css";

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
    let notifications = this.props.likesNotification
      .map((n, i) => {
        //console.log(this.props.likesNotification.length, '-', this.props.newNotificationsCount, i)
        // console.log(this.props.likesNotification.length-this.props.newNotificationsCount<i)
        return (
          <Notification
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

    return (
      <div>
        <h1>Notifications:</h1>
        <p>You have {this.props.newNotificationsCount} new notifications</p>
        {/* {this.props.newNotificationsCount ? */}
          <button type="button" onClick={this.props.cleanAllNotifications}>
            Clean all notifications
        </button> 
        {/* : <> </>} */}
        {notifications}
      </div>
    );
  }
}

const Notification = props => {
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
export default Notifications;
