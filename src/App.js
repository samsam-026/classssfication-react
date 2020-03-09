import React from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import ProtectedRoute from "./routes/ProtectedRoute";

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AllSightings from './pages/AllSightings';
import TopNavBar from './navigation/NavBar';
import NotFound from './pages/NotFound';
import AuthorityRoute from "./routes/AuthorityRoute";

function App(props) {
  const { isAuthenticated, isVerifying, user } = props;
  return (
    <>
      <TopNavBar />
      <Switch>
        <ProtectedRoute
          exact
          path="/"
          component={Home}
          isAuthenticated={isAuthenticated}
          isVerifying={isVerifying}
        />
        <AuthorityRoute
          exact
          path="/map"
          component={AllSightings}
          isAuthenticated={isAuthenticated}
          isVerifying={isVerifying}
          isAuthority={user.isAuth}
        />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isVerifying: state.auth.isVerifying,
    user: state.auth.user
  };
}
export default connect(mapStateToProps)(App);