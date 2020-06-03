import Navbar from "./Navbar";
import { connect } from "react-redux";
import {
  logout, 
  deletePage,
} from '../redux/auth-reducer';

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth
});

const mapDispatchToProps = ({
  logout, 
  deletePage, 
})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
