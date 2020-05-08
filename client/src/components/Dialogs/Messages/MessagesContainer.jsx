import {
  sendMessageCreator,
  addNewChatMember,
  getMessages,
  getChats,
  setCurrentChat
} from '../../redux/dialogs-reducer';
import { getMyData } from '../../redux/auth-reducer';
import Messages from './Messages';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    myId: state.auth.userId,
    messages: state.messagesState.messages,
    chats: state.messagesState.chats,
    friends: state.auth.myFriends,
    myData: state.auth.myData,
    currentChat: state.messagesState.currentChat,
  }
}

const mapDispatchToProps = ({
  sendMessage: sendMessageCreator,
  addNewChatMember,
  getMyData,
  getMessages,
  getChats,
  setCurrentChat,
})

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
