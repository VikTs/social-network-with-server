import React, { useState, useEffect } from 'react';
import Paginator from '../common/Paginator/Paginator';
import UsersFilter from './UsersFilter/UsersFilter';
import User from './User';

import './Users.scss';

let Users = ({ currentPage, onPageChanged, totalUsersCount, pageSize,
    users, followingInProgress, follow, unfollow, isFriendsPage,
    removeFriendNotification, addFriendNotification, removefromFriendsAC, ...props }) => {

    const [filteredUsers, setFilteredUsers] = useState(users);

    useEffect(() => {
        setFilteredUsers(users);
    }, [users]);

    return (
        <div className="users">
            {/* <Paginator
                totalItemsCount={totalUsersCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChanged={onPageChanged}
            /> */}

            <UsersFilter
                users={users}
                setFilteredUsers={setFilteredUsers}
            />
            <div>
                {filteredUsers.map((u, i) =>
                    (<User user={u}
                        setFilteredUsers={setFilteredUsers}
                        users={users}
                        filteredUsers={filteredUsers}
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