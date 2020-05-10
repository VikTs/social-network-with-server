import React from 'react'
import styles from './users.module.css'
import userPhoto from '../../images/user.png'
import { NavLink } from 'react-router-dom'

let User = ({ user, followingInProgress, unfollow, follow, isFriendsPage,
    removeFriendNotification, addFriendNotification, removefromFriendsAC, ...props }) => {

    return (<div key={user._id}>
        <span>
            <div>
                <NavLink to={'/profiles/' + user._id}>
                    <img 
                    alt="profile"
                    src={user.photos.small != null ? user.photos.small : userPhoto} 
                    className={styles.userPhoto} 
                    />
                </NavLink>
            </div>
            <div>

                {user.followed
                    ? <button disabled={followingInProgress
                        .some(id => id === user._id)}
                        onClick={() => {                            
                            unfollow(user._id);
                            removeFriendNotification(user._id)
                            // if (isFriendsPage) { removefromFriendsAC(user._id) }
                        }}>
                        {isFriendsPage ? 'Delete from friends' : 'Unfollow'}
                    </button>
                    : <button disabled={followingInProgress.some(id => id === user._id)}
                        onClick={() => { follow(user._id); addFriendNotification(user._id) }}>
                        Follow</button>}
            </div>
        </span>
        <span>
            <span>
                <div>{user.name}</div>
                <div>{user.status}</div>
            </span>
            <span>
                <div>{"user.country"}</div>
                <div>{user.city}</div>
            </span>
        </span>
    </div>)
}


export default User