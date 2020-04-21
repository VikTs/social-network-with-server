import React from 'react';
import classes from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem';
import Message from './Messages/Messages';
import { Field, reduxForm } from 'redux-form';
import { Textarea } from '../common/FormsControls/FormsControls';
import { required, maxLengthCreator } from '../../utils/validators/validators';
import { socket } from '../../App';

class Dialogs extends React.PureComponent {
    state = {
        message: '',
    }

    addNewMessage = (values) => {
        socket.emit('chat message', values.newMessageBody);

        socket.on('output', function (data) {
            console.log(data, 'output');
          });
        this.props.sendMessage(values.newMessageBody);
    }

    render() {
        const dialogsElements = this.props.messagesState.dialogs.map(dialog => (<DialogItem name={dialog.name} key={dialog.id} id={dialog.id} />))
        const messageElements = this.props.messagesState.messages.map(mess => (<Message message={mess.message} key={mess.id} />))
        return (
            <div className={classes.dialogs}>
                <div className={classes.dialogsItems}>
                    {dialogsElements}

                </div>
                <div className={classes.messages}>
                    <div>{messageElements}</div>
                    <AddMessageFormRedux onSubmit={this.addNewMessage} />
                </div>
            </div>
        );
    }
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

const AddMessageFormRedux = reduxForm({ form: 'dialogAddMessageForm' })(AddMessageForm)

export default Dialogs;