import React from "react";
import { Redirect } from "react-router-dom"

export const RedirectPage = ({ isAuth, ...props }) => (
  <Redirect
          to={{
            pathname: isAuth ? "/profiles" : "/login",
            state: { from: props.location }
          }}
        />
);
