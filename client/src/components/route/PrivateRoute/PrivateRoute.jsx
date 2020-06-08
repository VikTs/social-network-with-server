import React from "react";
import { Route, Redirect } from "react-router-dom"
import RedirectPage from "../Redirect"

export const PrivateRoute = ({ isAuth, render: Render, ...rest }) => (
  <Route
    {...rest}
    render={
      isAuth
        ? (Render)
        : (props) => (<RedirectPage {...props} />)
    }
  />
);
