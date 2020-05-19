import React, { useState } from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';

import { Spinner } from '../../common/Spinner/Spinner';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import userPhoto from '../../../images/user.png';
import ChoosePhotoModal from './ChoosePhotoModal/ChoosePhotoModal';
import { capitalize } from '../../../utils/format/format';

import './ProfileInfo.scss'
import { NavLink } from 'react-router-dom';

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
            <div className="profile-info-media-icons">
              <div className="profile-info-media-icon">
                <PhotoCameraIcon
                  classes={{ root: 'media-icon-img' }}
                  onClick={handleImageClick}
                />
              </div>
              <div className="profile-info-media-icon">
                <NavLink to="/settings">
                  <SettingsIcon
                    classes={{ root: 'media-icon-img' }}
                    onClick={handleImageClick}
                  />
                </NavLink>
              </div>
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