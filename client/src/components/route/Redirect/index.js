import { connect } from 'react-redux';

import { RedirectPage } from './Redirect';

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps)(RedirectPage);
