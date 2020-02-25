import React from 'react'
import styles from './users.module.css'
import userPhoto from '../../images/user.png'
import { NavLink } from 'react-router-dom'

let User = ({user, followingInProgress, unfollow, follow, ...props}) => {

    return (<div key={user.id}>
                <span>
                    <div>
                        <NavLink to={'/profiles/' + user.id}>
                            <img src={user.photos.small != null ? user.photos.small : userPhoto} className={styles.userPhoto} />
                        </NavLink>
                    </div>
                    <div>
                        {user.followed
                            ? <button disabled={followingInProgress.some(id=>id==user.id)} 
                            onClick={() => {
                                //... //props.toggleFollowingProgress(true, user.id)
                                //         // this.props.toggleIsFetching(false);
                                //         // this.props.setUsers(response.data.items);
                                //         // this.props.setTotalUsersCount(response.data.totalCount)
                                //     });
                                unfollow(user.id)
                            }}
                            >Unfollow</button>
                            : <button onClick={() => {follow(user.id)}}>Follow</button>}
                    </div>
                </span>
                <span>
                    <span>
                        <div>{user.name}</div>
                        <div>{user.status}</div>
                    </span>
                    <span>
                        <div>{"user.location.country"}</div>
                        <div>{"user.location.city"}</div>
                    </span>
                </span>
            </div>)}
 

export default User