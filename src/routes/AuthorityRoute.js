import React from 'react';
import { Route, Redirect } from "react-router-dom";

const AuthorityRoute = ({
    component: Component,
    isAuthenticated,
    isVerifying,
    isAuthority,
    isLoggingIn,
    ...rest
}) => (
        <Route
            {...rest}
            render={
                props =>
                    isVerifying || isLoggingIn ?
                        (<div />)
                        : isAuthenticated ?
                            isAuthority ?
                                (<Component {...props} />)
                                : (<Redirect to={{ pathname: "/", state: { from: props.location } }} />)
                            : (<Redirect to={{ pathname: "/login", state: { from: props.location } }} />)

            }
        />
    );
export default AuthorityRoute;