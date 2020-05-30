import React from 'react'
import { connect } from 'react-redux'
import {
    follow, unfollow, setCurrentPage, toggleFollowingProgress, getUsers, removefromFriendsAC
} from '../redux/users-reducer'
import { removeFriendNotification, addFriendNotification } from '../redux/notification-reducer'
import Friends from './Friends'
import { Spinner } from '../common/Spinner/Spinner'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { compose } from 'redux'
import {
    getUser, getFriend, getPageSize, getTotalUsersCount, getCurrentPage,
    getIsFetching, getFollowingInProgress
} from '../redux/users-selectors'
import { useEffect } from 'react'


const FriendsContainer = (props) => {
    useEffect(() => {
        const { currentPage, pageSize } = props;
        props.getUsers(currentPage, pageSize, false);
    }, []);

    const onPageChanged = (pageNumber) => {
        const { pageSize } = props;
        props.getUsers(pageNumber, pageSize, true);
    }

    return (
        <>
            {props.isFetching ? <Spinner /> :
                <Friends
                    totalUsersCount={props.totalUsersCount}
                    pageSize={props.pageSize}
                    onPageChanged={onPageChanged}
                    currentPage={props.currentPage}
                    users={props.users}
                    follow={props.follow}
                    unfollow={props.unfollow}
                    addFriendNotification={props.addFriendNotification}
                    removeFriendNotification={props.removeFriendNotification}
                    followingInProgress={props.followingInProgress}
                    getFriends={props.getFriends}
                    isFriendsPage={true}
                    removefromFriendsAC={props.removefromFriendsAC}
                />
            }
        </>)

}

const mapStateToProps = (state) => {
    return {
        users: getFriend(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {
        follow, unfollow, removeFriendNotification, addFriendNotification,
        setCurrentPage, toggleFollowingProgress, getUsers, removefromFriendsAC
    })
)(FriendsContainer)