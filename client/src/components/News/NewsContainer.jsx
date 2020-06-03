import {
  getUsers,
} from "../redux/users-reducer";
import News from "./News";
import { connect } from "react-redux";
import { compose } from 'redux';
import { withAuthRedirect } from "../../hoc/withAuthRedirect";

const mapDispatchToProps = dispatch => ({
  getUsers,
})

export default compose( 
  connect(null, mapDispatchToProps), 
  withAuthRedirect
)(News);
