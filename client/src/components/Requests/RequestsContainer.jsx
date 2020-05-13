import {
  getUsers,
} from "../redux/users-reducer";
import Requests from "./Requests";
import { connect } from "react-redux";
import { compose } from 'redux';
import { withAuthRedirect } from "../../hoc/withAuthRedirect";

let mapStateToProps = state => {
  return {
    likesNotification: state.notification.likesNotification,
    // friendNotificationRequest: state.notification.friendNotificationRequest,
    // friendNotificationResponse: state.notification.friendNotificationResponse,
    // friendNotificationDeleteRequest: state.notification.friendNotificationDeleteRequest,
    // newNotificationsCount: state.notification.newNotificationsCount
  };
};

const mapDispatchToProps = dispatch => ({
  getUsers,
})

export default compose( 
  connect(mapStateToProps, mapDispatchToProps), 
  withAuthRedirect
)(Requests);
