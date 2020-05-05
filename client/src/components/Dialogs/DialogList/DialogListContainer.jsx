import DialogsList from './DialogList';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  myId: state.auth.userId,
  chats: state.messagesState.chats,
});

export default connect(mapStateToProps)(DialogsList);
