import React from 'react'
import { connect } from 'react-redux'
import {
    follow, unfollow, setCurrentPage, toggleFollowingProgress, getUsers, removefromFriendsAC
} from '../redux/users-reducer'
import { removeFriendNotification, addFriendNotification } from '../redux/notification-reducer'
import Users from './Users'
import {Spinner} from '../common/Spinner/Spinner'
// import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { compose } from 'redux'
import {
    getUser, getPageSize, getTotalUsersCount, getCurrentPage,
    getIsFetching, getFollowingInProgress
} from '../redux/users-selectors'


class UsersContainer extends React.Component {
    componentDidMount() {
        this.isFriendsPage = window.location.pathname === '/friends';
        const { currentPage, pageSize } = this.props;
        this.props.getUsers(currentPage, pageSize, this.isFriendsPage);
    }

    // componentDiUpdate() {
    //     console.log('componentDiUpdate')
    //     this.isFriendsPage = window.location.pathname === '/friends';
    //     this.getUsers();
    // }

    onPageChanged = (pageNumber) => {
        const { pageSize } = this.props;
        this.props.getUsers(pageNumber, pageSize, this.isFriendsPage);
    }

    render() {
        return (
            <>
                {this.props.isFetching ? <Spinner /> : null}
                <Users
                    totalUsersCount={this.props.totalUsersCount}
                    pageSize={this.props.pageSize}
                    onPageChanged={this.onPageChanged}
                    currentPage={this.props.currentPage}
                    users={this.props.users}
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}
                    addFriendNotification={this.props.addFriendNotification}
                    removeFriendNotification={this.props.removeFriendNotification}
                    followingInProgress={this.props.followingInProgress}
                    getFriends={this.props.getFriends}
                    isFriendsPage={this.isFriendsPage}
                    removefromFriendsAC={this.props.removefromFriendsAC}
                />
            </>)
    }
}

let mapStateToProps = (state) => {
    return {
        users: getUser(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

export default compose(
    // withAuthRedirect,
    connect(mapStateToProps, {
        follow, unfollow, removeFriendNotification, addFriendNotification,
        setCurrentPage, toggleFollowingProgress, getUsers, removefromFriendsAC
    })
)(UsersContainer)