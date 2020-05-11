import { login } from '../../redux/auth-reducer';
import SignIn from './SignIn';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});

const mapDispatchToProps = ({
  login,
})

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
