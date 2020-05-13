import {
  getUsers,
} from "../redux/users-reducer";
import News from "./News";
import { connect } from "react-redux";
import { compose } from 'redux';
import { withAuthRedirect } from "../../hoc/withAuthRedirect";

let mapStateToProps = state => {
  return {
    likesNotification: state.notification.likesNotification,
  };
};

const mapDispatchToProps = dispatch => ({
  getUsers,
})

export default compose( 
  connect(mapStateToProps, mapDispatchToProps), 
  withAuthRedirect
)(News);
