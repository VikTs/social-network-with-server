import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
// import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

// import ModalMain from "../common/Modal/Modal";
import { validateSetting } from '../../utils/validators/validators';

import './Settings.scss';

const Settings = ({ login, logout, deletePage, userId, myFullData, getMyData, updateProfile }) => {
    ////////DELETE PAGE
    // const { push } = useHistory();
    // const [isOpenDeletePageModal, toggleOpenDeletePageModal] = useState(false);
    // const openDeletePageModal = () => toggleOpenDeletePageModal(true);
    // const closeDeletePageModal = () => toggleOpenDeletePageModal(false);
    // const handleDeletePage = () => {
    //     deletePage(userId);
    //     push('/signUp');
    // }

    const { push, goBack } = useHistory();

    const handleGoBack = () => goBack();

    const formik = useFormik({
        initialValues: {
            name: (myFullData && myFullData.name) || '',
            surname: (myFullData && myFullData.surname) || '',
            aboutMe: (myFullData && myFullData.aboutMe) || '',
            age: (myFullData && myFullData.age) || 14,
            city: (myFullData && myFullData.city) || '',
            facebook: (myFullData && myFullData.contacts && myFullData.contacts.facebook) || '',
            youtube: (myFullData && myFullData.contacts && myFullData.contacts.youtube) || '',
            image: (myFullData && myFullData.photos && myFullData.photos.small) || null,
        },
        validate: validateSetting,
        onSubmit: (values) => {
            updateProfile(values);
            getMyData();
            push('/profiles');
        },
        validateOnChange: false,
    });

    useEffect(() => {
        if (!myFullData) getMyData();
    }, []);

    return (
        <div>
            <button type="button" className="go-back settings">
                <ArrowBackIcon onClick={handleGoBack} />
            </button>
            {myFullData && (
                <form onSubmit={formik.handleSubmit} className="form-profile-edit">
                    <h1 className="form-profile-edit-header">Edit profile:</h1>
                    <TextField
                        id="name"
                        label="Name:"
                        name="name"
                        type="text"
                        defaultValue={myFullData.name}
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        helperText={formik.errors.name}
                        error={!!formik.errors.name}
                    />
                    <TextField
                        id="surname"
                        label="Surname:"
                        name="surname"
                        type="text"
                        defaultValue={myFullData.surname}
                        onChange={formik.handleChange}
                        value={formik.values.surname}
                        helperText={formik.errors.surname}
                        error={!!formik.errors.surname}
                    />
                    <TextField
                        id="aboutMe"
                        label="About me:"
                        name="aboutMe"
                        type="text"
                        defaultValue={myFullData.aboutMe}
                        onChange={formik.handleChange}
                        value={formik.values.aboutMe}
                        helperText={formik.errors.aboutMe}
                        error={!!formik.errors.aboutMe}
                    />                    
                    <TextField
                        id="age"
                        label="Age:"
                        name="age"
                        type="number"
                        defaultValue={myFullData.age}
                        onChange={formik.handleChange}
                        value={formik.values.age}
                        helperText={formik.errors.age}
                        error={!!formik.errors.age}
                        InputProps={{ inputProps: { max: 100, min: 14 } }}
                    />
                    <TextField
                        id="city"
                        label="City:"
                        name="city"
                        type="text"
                        defaultValue={myFullData.city}
                        onChange={formik.handleChange}
                        value={formik.values.city}
                        helperText={formik.errors.city}
                        error={!!formik.errors.city}
                    />
                    <TextField
                        id="facebook"
                        label="Facebook:"
                        name="facebook"
                        type="text"
                        defaultValue={myFullData.facebook}
                        onChange={formik.handleChange}
                        value={formik.values.facebook}
                        helperText={formik.errors.facebook}
                        error={!!formik.errors.facebook}
                    />
                    <TextField
                        id="youtube"
                        label="Youtube:"
                        name="youtube"
                        type="text"
                        defaultValue={myFullData.youtube}
                        onChange={formik.handleChange}
                        value={formik.values.youtube}
                        helperText={formik.errors.youtube}
                        error={!!formik.errors.youtube}
                    />
                    <TextField
                        id="image"
                        label="Image link:"
                        name="image"
                        type="url"
                        defaultValue={myFullData.image}
                        onChange={formik.handleChange}
                        value={formik.values.image}
                        helperText={formik.errors.image}
                        error={!!formik.errors.image}
                    />
                    <Button variant="contained" type="submit" classes={{ root: 'form-profile-edit-submit' }}>
                        Edit
                </Button>
                </form>
            )}




            {/* {isOpenDeletePageModal && <ModalMain
                title={`Do you really want to delete ${login} page? You will lost all information.`}
                onSubmit={handleDeletePage}
                onCloseMethod={closeDeletePageModal}
            />}
            <div> 
             <Button
                    variant="outlined"
                    type="button"
                    classes={{ root: 'delete-page-button' }}
                    onClick={openDeletePageModal}
                >
                    Delete page
              </Button> 
        </div>*/}
        </div >
    );
}

export default Settings;