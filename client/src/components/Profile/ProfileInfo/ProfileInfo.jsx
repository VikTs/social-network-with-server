import React, { useState } from 'react';

import { Spinner } from '../../common/Spinner/Spinner';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import userPhoto from '../../../images/user.png'
import ChoosePhotoModal from './ChoosePhotoModal/ChoosePhotoModal';

import './ProfileInfo.scss'

const ProfileInfo = ({ profile, status, updateUserStatus, isOwner, savePhoto, ...props }) => {
  const [isPhotoModal, togglePhotoModal] = useState(false);
  const openPhotoModal = () => togglePhotoModal(true);
  const closePhotoModal = () => togglePhotoModal(false);
  
  if (!profile) {
    return <Spinner />
  }

  const handleImageClick = () => {
    openPhotoModal();
  }

  const handleSavePhoto = (photoLink) => {
    if (isOwner) {
      savePhoto(photoLink);
    }
  }

  return (
    <div>
      {isPhotoModal && <ChoosePhotoModal
        onCloseMethod={closePhotoModal}
        onSubmit={handleSavePhoto}
      />}
      <div className="descriptionBlock">
        <img
          alt="profile"
          src={profile.photos.small || userPhoto}
          className="mainPhoto"
          onClick={handleImageClick}
        />
        {/* {isOwner && <input type={"file"} onChange={onMainPhotoSelected} />} */}

        <p>{'Name: ' + (profile.name || " ")}</p>
        <p>{'Surname: ' + (profile.surname || " ")}</p>
        <p>{'City: ' + (profile.city || " ")}</p>
        <p>{'Age: ' + (profile.age || " ")}</p>

        {isOwner
          ? <ProfileStatusWithHooks status={status} updateUserStatus={updateUserStatus} />
          : <span> {'Status: ' + (status || "-------")} </span>}

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