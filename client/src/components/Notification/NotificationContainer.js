import { createLikeNotification } from '../redux/notification-reducer';
import Notification from './Notification';
import { connect } from 'react-redux';

let mapStateToProps = (state) => {
  return {
    // posts: state.profileState.posts,
    // myId: state.auth.userId
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    createLikeNotification: (notification) => {
      dispatch(createLikeNotification(notification));
    }
  }
}

let NotificationContainer = connect(mapStateToProps, mapDispatchToProps)(Notification);

export default NotificationContainer;