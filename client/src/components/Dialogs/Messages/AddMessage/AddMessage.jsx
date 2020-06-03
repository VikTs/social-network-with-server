import React from 'react';
import { useFormik } from 'formik';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SendIcon from '@material-ui/icons/Send';

import { validateNewMessage } from '../../../../utils/validators/validators';

import './AddMessage.scss';

const AddMessage = ({ addNewMessage, chat }) => {
  const formik = useFormik({
    initialValues: {
      newMessageBody: '',
    },
    validate: validateNewMessage,
    onSubmit: (values, { resetForm }) => {
      addNewMessage(values);
      resetForm();
    },
  });

  return (
    <div className="new-message-container">
      <form onSubmit={formik.handleSubmit} className="new-message-form">
        <TextField
          id="newMessageBody"
          name="newMessageBody"
          type="text"
          variant="filled"
          placeholder="Message:"
          classes={{ root: 'new-message-body' }}
          onChange={formik.handleChange}
          value={formik.values.newMessageBody}
          error={!!formik.errors.newMessageBody}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SendIcon
                  onClick={formik.handleSubmit}
                  classes={{ root: "new-message-send-button" }}
                />
              </InputAdornment>
            ),
          }}
        />
      </form>
    </div>
  );
};

export default AddMessage;
