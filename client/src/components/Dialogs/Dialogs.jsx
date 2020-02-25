import React from 'react';
import classes from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem';
import Message from './Messages/Messages';
import { Field, reduxForm } from 'redux-form';
import { Textarea } from '../common/FormsControls/FormsControls';
import { required, maxLengthCreator } from '../../utils/validators/validators';

const Dialogs = (props) => {

    let state = props.messagesState;

    let dialogsElements = state.dialogs.map(dialog => (<DialogItem name={dialog.name} key={dialog.id} id={dialog.id} />))
    let messageElements = state.messages.map(mess => (<Message message={mess.message} key={mess.id} />))

    let addNewMessage = (values) => {
        props.sendMessage(values.newMessageBody);
    }

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                {dialogsElements}

            </div>
            <div className={classes.messages}>
                <div>{messageElements}</div>
                <AddMessageFormRedux onSubmit={addNewMessage} />
            </div>
        </div>
    );
}

const maxLength = maxLengthCreator(100);

const AddMessageForm = (props) => {    
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field 
                component={Textarea}
                validate={[required, maxLength]} 
                name='newMessageBody' placeholder='Enter your message' />
            </div>
            <div><button >Send</button></div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm({form:'dialogAddMessageForm'})(AddMessageForm)

export default Dialogs;