import React from 'react'
import styles from './users.module.css'
import userPhoto from '../../images/user.png'
import { NavLink } from 'react-router-dom'
import Paginator from '../common/Paginator/Paginator'
import User from './User'

let Users = ({ currentPage, onPageChanged, totalUsersCount, pageSize,
    users, followingInProgress, follow, unfollow, isFriendsPage,
    removeFriendNotification, addFriendNotification, removefromFriendsAC, ...props }) => {
    return (
        <div>
            <Paginator totalItemsCount={totalUsersCount} pageSize={pageSize} currentPage={currentPage} onPageChanged={onPageChanged} />
            <div>
                {users.map((u, i) => <User user={u}
                    isFriendsPage={isFriendsPage}
                    key={u._id}
                    followingInProgress={followingInProgress}
                    unfollow={unfollow}
                    follow={follow}
                    removeFriendNotification={removeFriendNotification}
                    addFriendNotification={addFriendNotification}
                    removefromFriendsAC={removefromFriendsAC} />)}
            </div>
        </div>
    )
}

export default Users