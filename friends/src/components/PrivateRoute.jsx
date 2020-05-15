import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        const token = localStorage.getItem("token"); // check that token exists
        const path = token ? (
          <Component {...props} /> // if so, render the component
        ) : (
          <Redirect to="/login" /> // if not, redirect to login
        );
        return path;
      }}
    />
  );
};

export default PrivateRoute;
