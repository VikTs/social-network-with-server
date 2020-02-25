import React from 'react'
import { connect } from 'react-redux'
import { followSuccess, unfollowSuccess, setCurrentPage, toggleFollowingProgress, getUsers 
} from '../redux/users-reducer'
import Users from './Users'
import Preloader from '../common/Preloader/Preloader'
// import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { compose } from 'redux'
import { getUser, getPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgress } from '../redux/users-selectors'


class UsersContainer extends React.Component {
    componentDidMount() {
        const {currentPage, pageSize} = this.props;
        this.props.getUsers(currentPage, pageSize);
    }

    onPageChanged = (pageNumber) => {
        const {pageSize} = this.props;
        this.props.getUsers(pageNumber, pageSize);
    }

    render() {
        return <>
        {this.props.isFetching ? <Preloader /> : null}
            <Users
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                onPageChanged={this.onPageChanged}
                currentPage={this.props.currentPage}
                users={this.props.users}
                follow={this.props.followSuccess}
                unfollow={this.props.unfollowSuccess}
                followingInProgress={this.props.followingInProgress}
            />
        </>
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
        followSuccess, unfollowSuccess, 
        setCurrentPage, toggleFollowingProgress, getUsers
    })
)(UsersContainer)