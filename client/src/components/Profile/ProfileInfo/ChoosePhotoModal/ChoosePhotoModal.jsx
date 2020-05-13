import React from 'react';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import { useFormik } from 'formik';
import { Modal, IconButton, TextField } from '@material-ui/core';

import './ChoosePhotoModal.scss';

const ChoosePhotoModal = ({ onSubmit, onCloseMethod }) => {
  const formik = useFormik({
    initialValues: {
      photo: '',
    },
    // validate: validateLogin,
    onSubmit: async (values) => {
      onSubmit(values.photo);
      onCloseMethod();
    },
    validateOnChange: false,
  });

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   onSubmit();
  //   onCloseMethod();
  // }

  return (
    <Modal open={true} className="modal-choose-photo">
      <div className="modal-photo-content">
        <IconButton onClick={onCloseMethod} className="modal-photo-close">
          <CloseIcon />
        </IconButton>
        <form onSubmit={formik.handleSubmit} className="form-photo">
          <h3 className="modal-photo-title">Choose profile photo</h3>
          <TextField
            id="photo"
            name="photo"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.photo}
          // helperText={formik.errors.photo}
          // error={!!formik.errors.photo}
          />
          <Button variant="contained" type="submit" classes={{ root: 'form-photo-submit' }}>
            Ok
          </Button>
          <Button
            onClick={onCloseMethod}
            variant="contained"
            type="button"
            classes={{ root: 'form-photo-cancel' }}
          >
            Cancel
          </Button>
        </form>
      </div>
    </Modal>
  )
}

export default ChoosePhotoModal;