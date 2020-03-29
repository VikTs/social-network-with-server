import React from "react";
import Header from "./Header";
import { connect } from "react-redux";
import { logout, deletePage } from "../redux/auth-reducer";
import { getNewNotificationCount } from "../redux/notification-reducer";

class HeaderContainer extends React.Component {

  componentDidMount(){
    this.props.getNewNotificationCount()
  }

  render() {
    return <Header {...this.props} />;
  }
}

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
  userId: state.auth.userId,
  newNotificationsCount: state.notification.newNotificationsCount,
});

export default connect(mapStateToProps, {
  logout, deletePage, getNewNotificationCount
})(HeaderContainer);
