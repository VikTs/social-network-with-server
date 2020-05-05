import { sendMessageCreator, addNewChatMember } from '../../redux/dialogs-reducer';
import { getMyData } from '../../redux/auth-reducer';
import Messages from './Messages';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    myId: state.auth.userId,
    messages: state.messagesState.messages,
    chats: state.messagesState.chats,
    friends: state.auth.myFriends,
  }
}

const mapDispatchToProps = ({
  sendMessage: sendMessageCreator,
  addNewChatMember,
  getMyData,
})

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
