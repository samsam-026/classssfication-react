import React from 'react';
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({
    component: Component,
    isAuthenticated,
    isVerifying,
    isLoggingIn,
    ...rest
}) => (
        <Route
            {...rest}
            render={props =>
                isVerifying || isLoggingIn ?
                    (<div />)
                    : isAuthenticated ?
                        (<Component {...props} />)
                        : (<Redirect to={{ pathname: "/login", state: { from: props.location,  } }} />)

            }
        />
    );
export default ProtectedRoute;