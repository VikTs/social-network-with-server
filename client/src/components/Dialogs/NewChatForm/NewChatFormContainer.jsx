import { createChat } from '../../redux/dialogs-reducer';
import NewChatForm from './NewChatForm';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        myData: state.auth.myFullData,
        friends: state.auth.myFriends,
    }
}

const mapDispatchToProps = {
    createChat,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewChatForm);
