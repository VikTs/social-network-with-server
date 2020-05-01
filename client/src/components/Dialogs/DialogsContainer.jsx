import React from 'react';
import { sendMessageCreator } from '../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

let mapStateToProps = (state) => {
    return {
        myId: state.auth.userId,
        messages: state.messagesState.messages,
        chats: state.messagesState.chats,
        friends: state.userPage.friends,
    }
}

let mapDispatchToProps = ({
    sendMessage: sendMessageCreator,
})

export default compose( //конвеер, перекидывает элемент, снизу вверх
    connect(mapStateToProps, mapDispatchToProps), //возвращает hoc
    withAuthRedirect
)(Dialogs);