import React from 'react';
import userPhoto from '../../../images/user.png';
import { NavLink } from 'react-router-dom';
import { Card, CardContent, Typography } from '@material-ui/core';

import { capitalize } from '../../../utils/format/format';

import './User.scss';

const User = ({
    user,
    users,
    followingInProgress,
    unfollow,
    follow,
    isFriendsPage,

    setFilteredUsers,
    filteredUsers
}) => {

    const handleFollow = (e, id) => {
        e.stopPropagation();
        e.preventDefault();

        follow(id);
        if (isFriendsPage) {
            setFilteredUsers([...filteredUsers, users.find(user => user._id === id)]);
        }
    };

    const handleUnFollow = (e, id) => {
        e.stopPropagation();
        e.preventDefault();

        unfollow(id);
        if (isFriendsPage) {
            setFilteredUsers(filteredUsers.filter(user => user._id !== id));
        }
    };

    return (
        <div key={user._id} className="user">
            <Card className="user-card">
                <CardContent className="user-card-content">
                    <Typography variant="subtitle1">
                        <NavLink to={'/profiles/' + user._id} className="user-profile-link">
                            <span className="user-main">
                                <div className="profile-photo-container">
                                    <img
                                        alt="profile"
                                        src={user.photos.small != null ? user.photos.small : userPhoto}
                                        className="user-photo-media"
                                    />
                                </div>
                                <div className="user-data">
                                    <p>{`${capitalize(user.name)} ${capitalize(user.surname)}`}</p>
                                </div>
                                <div className="follow">
                                    {user.followed
                                        ? <button disabled={followingInProgress
                                            .some(id => id === user._id)}
                                            onClick={(e) => { handleUnFollow(e, user._id); }}
                                            className="user-follow-toggle unfollow"
                                        >
                                            {isFriendsPage ? 'Delete from friends' : 'Unfollow'}
                                        </button>
                                        : <button disabled={followingInProgress.some(id => id === user._id)}
                                            onClick={(e) => { handleFollow(e, user._id); }}
                                            className="user-follow-toggle follow"
                                        >
                                            + Follow
                                        </button>}
                                </div>
                            </span>
                        </NavLink>
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}


export default User