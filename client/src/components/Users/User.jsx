import React from 'react'
import styles from './users.module.css'
import userPhoto from '../../images/user.png'
import { NavLink } from 'react-router-dom'

let User = ({ user, followingInProgress, unfollow, follow, ...props }) => {

    return (<div key={user._id}>
        <span>
            <div>
                <NavLink to={'/profiles/' + user._id}>
                    <img src={user.photos.small != null ? user.photos.small : userPhoto} className={styles.userPhoto} />
                </NavLink>
            </div>
            <div>
                {/* {user.followed
                            ? <button disabled={followingInProgress.some(id=>id==user._id)} 
                            onClick={() => {

                                // props.toggleFollowingProgress(true, user._id)
                                // this.props.toggleIsFetching(false);
                                // this.props.setUsers(response.data.items);
                                // this.props.setTotalUsersCount(response.data.totalCount)
                                    
                                unfollow(user._id)
                            }}
                            >Unfollow</button>
                            : <button onClick={() => {follow(user._id)}}>Follow</button>} */}


                {user.followed
                    ? <button disabled={followingInProgress
                        .some(id => id === user._id)}
                        onClick={() => { unfollow(user._id) }}>
                        Unfollow</button>
                    : <button disabled={followingInProgress.some(id => id === user._id)}
                        onClick={() => { follow(user._id) }}>
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