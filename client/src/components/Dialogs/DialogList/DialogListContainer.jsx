import DialogsList from './DialogList';
import { deleteChat } from '../../redux/dialogs-reducer';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  myId: state.auth.userId,
  chats: state.messagesState.chats,
});

const mapDispatchToProps = ({
  deleteChat,  
})

export default connect(mapStateToProps, mapDispatchToProps)(DialogsList);
