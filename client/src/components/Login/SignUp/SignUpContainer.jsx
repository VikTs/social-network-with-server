import { registration } from '../../redux/auth-reducer';
import SignUp from './SignUp';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});

const mapDispatchToProps = ({
  registration,
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
