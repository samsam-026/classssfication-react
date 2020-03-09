import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css';
import { Provider } from "react-redux";
import configureStore from "./configureStore";
import App from './App';

const store = configureStore();

function Root() {
    return (
        <Provider store={store}>
            <Router>
                <App />
            </Router>
        </Provider>
    );
}

export default Root;
