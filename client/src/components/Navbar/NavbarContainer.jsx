import React from "react";
import Navbar from "./Navbar";
import { connect } from "react-redux";
import {
  logout, 
  deletePage,
} from '../redux/auth-reducer';

const mapStateToProps = state => ({

});

const mapDispatchToProps = ({
  logout, 
  deletePage, 
})

export default connect(null, mapDispatchToProps)(Navbar);
