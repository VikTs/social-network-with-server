import { connect } from 'react-redux';

import { PrivateRoute } from './PrivateRoute';

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps)(PrivateRoute);
