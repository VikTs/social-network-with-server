import { createChat } from '../../redux/dialogs-reducer';
import { getMyData } from '../../redux/auth-reducer';
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
    getMyData,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewChatForm);
