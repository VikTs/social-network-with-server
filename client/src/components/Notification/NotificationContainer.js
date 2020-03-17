import { getNotificationList } from '../redux/notification-reducer';
import Notifications from './Notification';
import { connect } from 'react-redux';

let mapStateToProps = (state) => {
  return {
     likesNotification: state.notification.likesNotification,
     friendNotification: state.notification.friendNotification,
     newNotificationsCount: state.notification.newNotificationsCount
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    getNotificationList: () => {
      dispatch(getNotificationList());
    }
  }
}

let NotificationContainer = connect(mapStateToProps, mapDispatchToProps)(Notifications);

export default NotificationContainer;