import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AllSightings from './pages/AllSightings';
import TopNavBar from './navigation/NavBar';
import NotFound from './pages/NotFound';

const routing = (
    <Router>
        <div>
            <TopNavBar />
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/home" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/map" component={AllSightings} />
                <Route component={NotFound} />
            </Switch>
        </div>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
