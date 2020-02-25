import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getUserProfile, getUserStatus, updateUserStatus, savePhoto } from '../redux/profile-reducer'
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
    this.props.getUserStatus(userId)
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
    //console.log(this.props.profile)
    return (
      <Profile {...this.props}
        isOwner={!this.props.match.params.userId}
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
  isAuth: state.auth.isAuth
})

export default compose( //конвеер, перекидывает элемент, снизу вверх
  connect(mapStateToProps, { getUserProfile, getUserStatus, updateUserStatus, savePhoto}),
  withRouter,
  withAuthRedirect
)(ProfileContainer)