import React from 'react';
import userPhoto from '../../images/user.png';
import { NavLink } from 'react-router-dom';

import './Users.scss';

let User = ({
    user,
    users,
    followingInProgress,
    unfollow,
    follow,
    isFriendsPage,
    removeFriendNotification,
    addFriendNotification,
    removefromFriendsAC,
    setFilteredUsers,
    filteredUsers
}) => {

    const handleFollow = (id) => {
        follow(id);
        addFriendNotification(id);

        if (isFriendsPage) setFilteredUsers([...filteredUsers, 
            users.find(user => user._id === id)
        ]);
    };

    const handleUnFollow = (id) => {
        unfollow(id);
        removeFriendNotification(id)
        // if (isFriendsPage) { removefromFriendsAC(id) }

        if (isFriendsPage) setFilteredUsers(filteredUsers.filter(user => user._id !== id));
    };

    return (
        <div key={user._id} className="user">
            <span className="user-main">
                <div className="user-photo">
                    <NavLink to={'/profiles/' + user._id}>
                        <img
                            alt="profile"
                            src={user.photos.small != null ? user.photos.small : userPhoto}
                            className="user-photo-media"
                        />
                    </NavLink>
                </div>
                <div className="follow">
                    {user.followed
                        ? <button disabled={followingInProgress
                            .some(id => id === user._id)}
                            onClick={() => { handleUnFollow(user._id);}}>
                            {isFriendsPage ? 'Delete from friends' : 'Unfollow'}
                        </button>
                        : <button disabled={followingInProgress.some(id => id === user._id)}
                            onClick={() => { handleFollow(user._id); }}>
                            Follow</button>}
                </div>
            </span>
            <div className="user-data">
                <p>{user.name}</p>
                <p>{user.status}</p>
                <p>{user.city}</p>
            </div>
        </div>
    )
}


export default User