import React, { useState, useEffect } from 'react';
// import styles from './users.module.css';
// import userPhoto from '../../images/user.png';
import Paginator from '../common/Paginator/Paginator';
import UsersFilter from './UsersFilter/UsersFilter';
import User from './User';

let Users = ({ currentPage, onPageChanged, totalUsersCount, pageSize,
    users, followingInProgress, follow, unfollow, isFriendsPage,
    removeFriendNotification, addFriendNotification, removefromFriendsAC, ...props }) => {

    const [filteredUsers, setFilteredUsers] = useState(users);

    useEffect(() => {
        setFilteredUsers(users);
    }, [users]);

    return (
        <div>
            {/* <Paginator
                totalItemsCount={totalUsersCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChanged={onPageChanged}
            /> */}

            {!isFriendsPage && (
                <UsersFilter
                    users={users}
                    setFilteredUsers={setFilteredUsers}
                />
            )}
            <div>
                {filteredUsers.map((u, i) =>
                    (<User user={u}
                        isFriendsPage={isFriendsPage}
                        key={u._id}
                        followingInProgress={followingInProgress}
                        unfollow={unfollow}
                        follow={follow}
                        removeFriendNotification={removeFriendNotification}
                        addFriendNotification={addFriendNotification}
                        removefromFriendsAC={removefromFriendsAC}
                    />))}
            </div>
        </div>
    )
}

export default Users