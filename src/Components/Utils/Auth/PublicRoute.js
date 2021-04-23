import React from "react";
import { Route, Redirect } from "react-router-dom";
import TokenService from "../../../Services/Auth/token-service";

export default function PublicRoute({ component, ...props }) {
  const Component = component;
  return (
    <Route
      {...props}
      render={(componentProps) =>
        TokenService.hasAuthToken() ? (
          <Redirect to={"/scripts"} />
        ) : (
          <Component {...componentProps} />
        )
      }
    />
  );
}
