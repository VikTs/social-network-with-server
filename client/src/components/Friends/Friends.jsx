import React, { useState, useEffect } from 'react';

// import Paginator from '../common/Paginator/Paginator';
import FriendsFilter from './FriendsFilter/FriendsFilter';
import User from '../common/User/UserContainer';
import { compareIncludeStrings } from '../../utils/format/format';

import './Friends.scss';

const Friends = ({ currentPage, onPageChanged, totalUsersCount, pageSize,
    users, followingInProgress, follow, unfollow, removefromFriendsAC }) => {

    const [filteredFriends, setFilteredFriends] = useState(users);
    const [filteredFriendsText, setFilteredFriendsText] = useState('');

    useEffect(() => {
        if (!filteredFriends) {
            setFilteredFriends(users);
        } else {
            setFilteredFriends(users.filter(user =>
                user.followed === true &&
                compareIncludeStrings(`${user.name} ${user.surname}`, filteredFriendsText)
            ));
        }
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
                filteredFriendsText={filteredFriendsText}
                setFilteredFriendsText={setFilteredFriendsText}
            />
            <div>
                {filteredFriends &&
                    filteredFriends.map((u, i) =>
                        (<User user={u}
                            setFilteredUsers={setFilteredFriends}
                            filteredUsers={filteredFriends}
                            isFriendsPage={true}
                            key={u._id}
                        />))
                }
                {(!filteredFriends || !filteredFriends.length) && "No friends found"}
            </div>
        </div>
    )
}

export default Friends