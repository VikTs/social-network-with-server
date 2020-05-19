import { withAuthRedirect } from '../../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
    follow, 
    unfollow, 
    setCurrentPage, 
    toggleFollowingProgress,
    getUsers, 
    removefromFriendsAC,
    setSubscribers,
} from '../../redux/users-reducer';
import { removeFriendNotification, addFriendNotification } from '../../redux/notification-reducer';
import {
  getUser, 
  getPageSize, 
  getTotalUsersCount, 
  getCurrentPage,
  getIsFetching, 
  getFollowingInProgress
} from '../../redux/users-selectors';

import User from './User';

const mapStateToProps = (state) => {
    return {
        users: getUser(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    }
}

const mapDispatchToProps = ({
  follow, 
  unfollow, 
  getUsers, 
  setCurrentPage, 
  setSubscribers,
  removefromFriendsAC,
  addFriendNotification,
  removeFriendNotification, 
  toggleFollowingProgress, 
})

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, mapDispatchToProps)
)(User)