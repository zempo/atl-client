import React from "react";
import { Route, Redirect } from "react-router-dom";
import TokenService from "../../../services/auth/token-service";

export default function AuthorizedRoute({ component, ...props }) {
  const Component = component;
  return (
    <Route
      {...props}
      render={(componentProps) =>
        TokenService.hasAuthToken() ? (
          <Component {...componentProps} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: componentProps.location }
            }}
          />
        )
      }
    />
  );
}
