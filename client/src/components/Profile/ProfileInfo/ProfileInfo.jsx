import React, { useState } from 'react';

import { Spinner } from '../../common/Spinner/Spinner';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import userPhoto from '../../../images/user.png';
import ChoosePhotoModal from './ChoosePhotoModal/ChoosePhotoModal';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';

import './ProfileInfo.scss'

const ProfileInfo = ({ profile, status, updateUserStatus, isOwner, savePhoto, ...props }) => {
  const { name, surname, city, age, contacts, aboutMe } = profile || {};
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
    savePhoto(photoLink);
  };

  const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  return (
    <div>
      {isPhotoModal && <ChoosePhotoModal
        onCloseMethod={closePhotoModal}
        onSubmit={handleSavePhoto}
      />}
      <div className="profile-info">
        <div className="profile-info-media">
          <div className="content-blur"></div>
          <img
            alt="profile"
            src={profile.photos.small || userPhoto}
            className="profile-info-media-photo"
          />
          {isOwner && (
            <div className="profile-info-media-icon">
              <PhotoCameraIcon
                classes={{ root: 'media-icon-img' }}
                onClick={handleImageClick}
              />
            </div>
          )}
        </div>
        <div className="profile-info-content">
          <p className="profile-info-content-name">{(`${capitalize(name)} ${capitalize(surname)}`)}</p>
          <div className="profile-info-content-data">
            <p className="profile-info-content-city">{`City: ${(capitalize(city))}`}</p>
            <p className="profile-info-content-age">{'Age: ' + (age || " ")}</p>
            {isOwner
              ? <ProfileStatusWithHooks status={status} updateUserStatus={updateUserStatus} />
              : <span> {'Status: ' + (status || "---")} </span>}
            <p>{'About me: ' + (aboutMe || " ")}</p>
            {contacts &&
              <div>
                {contacts.facebook && (<p>{`Facebook: ${contacts.facebook}`}</p>)}
                {contacts.youtube && (<p>{`Yotube: ${contacts.youtube}`}</p>)}
              </div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileInfo;