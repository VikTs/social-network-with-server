import {
  logout, 
  deletePage,
} from '../redux/auth-reducer';
import Settings from './Settings';
import { connect } from 'react-redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
    login: state.auth.login,
  }
}

const mapDispatchToProps = ({
  logout, 
  deletePage, 
})

export default compose( 
  connect(mapStateToProps, mapDispatchToProps), 
  withAuthRedirect
)(Settings);
