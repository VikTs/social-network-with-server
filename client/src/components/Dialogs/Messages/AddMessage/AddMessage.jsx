import React from 'react';
import { useFormik } from 'formik';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

// import { validateNewMessage } from '../../../../utils/validators/validators';

import './AddMessage.scss';

const AddMessage = ({ addNewMessage, chat }) => {
  const formik = useFormik({
    initialValues: {
      newMessageBody: '',
    },
    // validate: validateNewMessage,
    onSubmit: (values, { resetForm }) => {
      values.newMessageBody && addNewMessage(values);
      resetForm();
    },
    validateOnChange: false,
  });

  return (
    <div className="new-message-container">
      <form onSubmit={formik.handleSubmit} className="new-message-form">
        <TextField
          id="newMessageBody"
          name="newMessageBody"
          type="text"
          placeholder="Message:"
          classes={{ root: 'new-message-body' }}
          onChange={formik.handleChange}
          value={formik.values.newMessageBody}
          helperText={formik.errors.newMessageBody}
          error={!!formik.errors.newMessageBody}
        />
        <Button variant="contained" type="submit" classes={{ root: 'new-message-submit' }}>
          Send
      </Button>
      </form>
    </div>
  );
};

export default AddMessage;
