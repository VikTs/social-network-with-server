import {
    sendMessageCreator,
    createChat,
    addNewChatMember,
    getChats,
    setChats,
} from '../redux/dialogs-reducer';
import { getMyData } from '../redux/auth-reducer';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

const mapStateToProps = (state) => {
    return {
        myId: state.auth.userId,
        messages: state.messagesState.messages,
        chats: state.messagesState.chats,
        myData: state.auth.myFullData,
        friends: state.auth.myFriends,
    }
}

const mapDispatchToProps = ({
    sendMessage: sendMessageCreator,
    createChat,
    getMyData,
    addNewChatMember,
    getChats,
    setChats,
})

export default compose( //конвеер, перекидывает элемент, снизу вверх
    connect(mapStateToProps, mapDispatchToProps), //возвращает hoc
    withAuthRedirect
)(Dialogs);
