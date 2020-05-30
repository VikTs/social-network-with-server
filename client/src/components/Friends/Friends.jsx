import React, { useState, useEffect } from 'react';
import Paginator from '../common/Paginator/Paginator';
import FriendsFilter from './FriendsFilter/FriendsFilter';
import User from '../common/User/UserContainer';

import './Friends.scss';

const Friends = ({ currentPage, onPageChanged, totalUsersCount, pageSize,
    users, followingInProgress, follow, unfollow, isFriendsPage,
    removeFriendNotification, addFriendNotification, removefromFriendsAC, ...props }) => {

    const [filteredFriends, setFilteredFriends] = useState(users);

    useEffect(() => {
        setFilteredFriends(users);
        console.log(users)
    }, [users]);


    return (
        <div className="users">
            {/* <Paginator
                totalItemsCount={totalUsersCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChanged={onPageChanged}
            /> */}

            <FriendsFilter
                users={users}
                setFilteredFriends={setFilteredFriends}
            />
            <div>
                {filteredFriends.length ?
                    filteredFriends.map((u, i) =>
                        (<User user={u}
                            setFilteredUsers={setFilteredFriends}
                            filteredUsers={filteredFriends}
                            isFriendsPage={isFriendsPage}
                            key={u._id}
                        />)) :
                    "No users found"
                }
            </div>
        </div>
    )
}

export default Friends