import React, { useState, useEffect } from 'react';
import Paginator from '../common/Paginator/Paginator';
import UsersFilter from './UsersFilter/UsersFilter';
import User from '../common/User/UserContainer';

import './Users.scss';

const Users = ({ currentPage, onPageChanged, totalUsersCount, pageSize,
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
                        filteredUsers={filteredUsers}
                        isFriendsPage={false}
                        key={u._id}
                    />))}
            </div>
        </div>
    )
}

export default Users