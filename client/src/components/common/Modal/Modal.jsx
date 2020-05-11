import React from 'react';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import { Modal, IconButton } from '@material-ui/core';

import './Modal.scss';

const ModalMain = ({ title, onSubmit, onCloseMethod }) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
    onCloseMethod();
  }

  return (
    <Modal open={true} className="modal">
      <div className="modal-main">
        <IconButton onClick={onCloseMethod} className="modal-main-close">
          <CloseIcon />
        </IconButton>
        <form onSubmit={handleSubmit} className="form-main">
          <h3 className="modal-main-title">{title}</h3>
          <Button variant="contained" type="submit" classes={{ root: 'form-main-submit' }}>
            Ok
          </Button>
          <Button
            onClick={onCloseMethod}
            variant="contained"
            type="button"
            classes={{ root: 'form-main-cancel' }}
          >
            Cancel
          </Button>
        </form>
      </div>
    </Modal>
  )
}

export default ModalMain;