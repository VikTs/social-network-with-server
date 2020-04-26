import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Input } from '../../../../common/FormsControls/FormsControls';
import { required, maxLengthCreator } from '../../../../../utils/validators/validators';

const maxLength = maxLengthCreator(100);

const AddMessageForm = (props) => {
    // console.log(props.chat);
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field
                    component={Input}
                    validate={[required, maxLength]}
                    name='newMessageBody'
                    placeholder='Enter your message'
                />
            </div>
            <div><button >Send</button></div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm({ form: 'dialogAddMessageForm' })(AddMessageForm)

export default AddMessageFormRedux;