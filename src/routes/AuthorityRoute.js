import React from 'react';
import { Route, Redirect } from "react-router-dom";

const AuthorityRoute = ({
    component: Component,
    isAuthenticated,
    isVerifying,
    isAuthority,
    ...rest
}) => (
        <Route
            {...rest}
            render={
                props =>
                    isVerifying ?
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