import {
  logout, 
  deletePage,
  getMyData,
} from '../redux/auth-reducer';
import { updateProfile } from '../redux/profile-reducer';
import Settings from './Settings';
import { connect } from 'react-redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
    login: state.auth.login,
    myFullData: state.auth.myFullData,
  }
}

const mapDispatchToProps = ({
  logout, 
  deletePage,
  getMyData,
  updateProfile,
})

export default compose( 
  connect(mapStateToProps, mapDispatchToProps), 
  withAuthRedirect
)(Settings);
