import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./fetchprofiling";

const AdminRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated() && isAuthenticated().user.role.toString() === 'admin' ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/signin",
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
);

export default AdminRoute;