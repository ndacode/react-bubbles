import React from "react";
import { Route, Redirect } from "react-router-dom";
import BubblePage from "./BubblePage";

const isAuthenticated = () => {
  return localStorage.getItem("token") ? true : false;
};
export default function PrivateRoute({ children, ...rest }) {
  console.log("...rest", rest);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated() ? (
          <BubblePage {...children} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}
