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
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: (chat_id, user_id, context, date_create) => {
            dispatch(sendMessageCreator(chat_id, user_id, context, date_create));
        }
    }
}

export default compose( //конвеер, перекидывает элемент, снизу вверх
    connect(mapStateToProps, mapDispatchToProps), //возвращает hoc
    withAuthRedirect
)(Dialogs);