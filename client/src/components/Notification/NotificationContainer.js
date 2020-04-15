import {
  getNotificationList,
  zeroingNotificationsCount,
  cleanAllNotifications
} from "../redux/notification-reducer";
import Notifications from "./Notification";
import { connect } from "react-redux";

let mapStateToProps = state => {
  return {
    likesNotification: state.notification.likesNotification,
    friendNotificationRequest: state.notification.friendNotificationRequest,
    friendNotificationResponse: state.notification.friendNotificationResponse,
    friendNotificationDeleteRequest: state.notification.friendNotificationDeleteRequest,
    newNotificationsCount: state.notification.newNotificationsCount
  };
};

let mapDispatchToProps = dispatch => {
  return {
    getNotificationList: () => {
      dispatch(getNotificationList());
    },
    zeroingNotificationsCount: () => {
      dispatch(zeroingNotificationsCount());
    },
    cleanAllNotifications: () => {
      dispatch(cleanAllNotifications());
    }
  };
};

let NotificationContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Notifications);

export default NotificationContainer;
