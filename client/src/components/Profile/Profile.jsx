import React from 'react';
import classes from './Profile.module.css'
import ProfileInfo from '../MyPosts/ProfileInfo/ProfileInfo';
import MyPostsContainer from '../MyPosts/MyPostsContainer';

const Profile = (props) => {
  return (
    <div className={classes.content}>
      <ProfileInfo
        isOwner={props.isOwner}
        profile={props.profile}
        status={props.status}
        updateUserStatus={props.updateUserStatus}
        savePhoto={props.savePhoto} />
      <div>
        <MyPostsContainer 
        isOwner={props.isOwner} currentPageUserId={props.currentPageUserId}/>
      </div>
    </div>
  );
}

export default Profile;