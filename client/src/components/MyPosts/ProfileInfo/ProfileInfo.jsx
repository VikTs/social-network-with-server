import React from 'react';
import classes from './ProfileInfo.module.css'
import Preloader from '../../common/Preloader/Preloader';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import userPhoto from '../../../images/user.png'

const ProfileInfo = ({ profile, status, updateUserStatus, isOwner, savePhoto, ...props }) => {
  if (!profile) {
    return <Preloader />
  }

  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      savePhoto(e.target.files[0]);
    }
  }

  return (
    <div>
      <div className={classes.descriptionBlock}>
        <img src={profile.photos.large || userPhoto} className={classes.mainPhoto} />
        {isOwner && <input type={"file"} onChange={onMainPhotoSelected} />}

        <p>{'Name: ' + (profile.name || " ")}</p>
        <p>{'Surname: ' + (profile.surname || " ")}</p>
        <p>{'City: ' + (profile.city || " ")}</p>
        <p>{'Age: ' + (profile.age || " ")}</p>

        <ProfileStatusWithHooks
          status={status}
          updateUserStatus={updateUserStatus} />

        <p>{'About me: ' + (profile.aboutMe || " ")}</p>

        {profile.contacts &&
          <div>
            <p>{'Facebook: ' + (profile.contacts.facebook || " ")}</p>
            <p>{'Yotube: ' + (profile.contacts.youtube || " ")}</p>
          </div>}

      </div>
    </div>
  );
}

export default ProfileInfo;