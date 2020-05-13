import React from 'react';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from '../MyPosts/MyPostsContainer';

import './Profile.scss';

const Profile = ({
  isOwner,
  profile,
  status,
  updateUserStatus,
  savePhoto,
  currentPageUserId
}) => {
  return (
    <div className="profile-content">
      <ProfileInfo
        isOwner={isOwner}
        profile={profile}
        status={status}
        updateUserStatus={updateUserStatus}
        savePhoto={savePhoto} />
      <div>
        <MyPostsContainer
          isOwner={isOwner} currentPageUserId={currentPageUserId} />
      </div>
    </div>
  );
}

export default Profile;