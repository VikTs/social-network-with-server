import React from 'react'
import { connect } from 'react-redux'
import {
    follow, unfollow, setCurrentPage, toggleFollowingProgress, getUsers, removefromFriendsAC
} from '../redux/users-reducer'
import Users from './Users'
import { Spinner } from '../common/Spinner/Spinner'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { compose } from 'redux'
import {
    getUser, getPageSize, getTotalUsersCount, getCurrentPage,
    getIsFetching, getFollowingInProgress
} from '../redux/users-selectors'
import { useEffect } from 'react'

const UsersContainer = (props) => {
    useEffect(() => {
        const { currentPage, pageSize } = props;
        props.getUsers(currentPage, pageSize, false);
    }, []);

    const onPageChanged = (pageNumber) => {
        const { pageSize } = props;
        props.getUsers(pageNumber, pageSize, false);
    }

    return (
        <>
            {props.isFetching ? <Spinner /> :
                <Users
                    totalUsersCount={props.totalUsersCount}
                    pageSize={props.pageSize}
                    onPageChanged={onPageChanged}
                    currentPage={props.currentPage}
                    users={props.users}
                    follow={props.follow}
                    unfollow={props.unfollow}
                    followingInProgress={props.followingInProgress}
                    getFriends={props.getFriends}
                    isFriendsPage={false}
                    removefromFriendsAC={props.removefromFriendsAC}
                />
            }
        </>)
}

const mapStateToProps = (state) => ({
    users: getUser(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state)
})


export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {
        follow, unfollow, setCurrentPage, toggleFollowingProgress, 
        getUsers, removefromFriendsAC
    })
)(UsersContainer)