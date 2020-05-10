import {
  addNewChatMember,
  deleteChat,
  deleteMemberFromChat,
} from '../../../../redux/dialogs-reducer';
import MessagesInfoModal from './MessagesInfoModal';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    myId: state.auth.userId,
    friends: state.auth.myFriends,
  }
}

const mapDispatchToProps = ({
  addNewChatMember,
  deleteMemberFromChat,
  deleteChat,
})

export default connect(mapStateToProps, mapDispatchToProps)(MessagesInfoModal);
