import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getUserProfile, getUserStatus, updateUserStatus, savePhoto, setPosts } from '../redux/profile-reducer'
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

class ProfileContainer extends React.Component {

  refreshProfile() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = this.props.autorithedUserId;
      if (!userId) {
        this.props.history.push('/login')
      }
    }
    this.props.getUserProfile(userId);
    this.props.getUserStatus(userId);
    this.props.setPosts(userId);
  }

  componentDidMount() {
    this.refreshProfile()
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.userId != prevProps.match.params.userId) {
      this.refreshProfile()
    }
  }

  render() {
    return (
      <Profile {...this.props}
        isOwner={!this.props.match.params.userId}
        currentPageUserId={this.props.match.params.userId || this.props.autorithedUserId}
        profile={this.props.profile}
        status={this.props.status}
        updateUserStatus={this.props.updateUserStatus}        
        savePhoto={this.props.savePhoto}
      />
    );
  }
}

let mapStateToProps = (state) => ({
  profile: state.profileState.profile,
  status: state.profileState.status,
  autorithedUserId: state.auth.userId,
  isAuth: state.auth.isAuth,
  myId: state.auth.userId
})

export default compose( //конвеер, перекидывает элемент, снизу вверх
  connect(mapStateToProps, { getUserProfile, getUserStatus, updateUserStatus, savePhoto, setPosts}),
  withRouter,
  withAuthRedirect
)(ProfileContainer)