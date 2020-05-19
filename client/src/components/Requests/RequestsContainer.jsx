import {  getUsers, setSubscribers } from "../redux/users-reducer";
import {  getMyData } from "../redux/auth-reducer";
import Requests from "./Requests";
import { connect } from "react-redux";
import { compose } from 'redux';
import { withAuthRedirect } from "../../hoc/withAuthRedirect";

const mapStateToProps = state => {
  return {
    myFullData: state.auth.myFullData,
    users: state.userPage.users,
    subscribers: state.userPage.subscribers,    
  };
};

const mapDispatchToProps = {
  getUsers,
  getMyData,
  setSubscribers,
};

export default compose( 
  connect(mapStateToProps, mapDispatchToProps), 
  withAuthRedirect
)(Requests);
