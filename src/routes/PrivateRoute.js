import React, { useContext } from "react";
import { AuthContext } from "state/contexts/Auth";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const { user } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        user.uid ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={"/user/login"} />
        )
      }
    />
  );
};

export default PrivateRoute;
