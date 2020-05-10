import {
  sendMessageCreator,
  addNewChatMember,
  deleteChatAC,
  getMessages,
  getChats,
  setCurrentChat,
  setCurrentMessages,
  deleteMemberFromChat,
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
    currentMessages: state.messagesState.currentMessages,
  }
}

const mapDispatchToProps = ({
  sendMessage: sendMessageCreator,
  addNewChatMember,
  getMyData,
  getMessages,
  getChats,
  setCurrentChat,
  setCurrentMessages,
  deleteMemberFromChat,
  deleteChatAC,
})

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
