import React from 'react'
import {Route, Redirect, Switch, BrowserRouter as Router } from 'react-router-dom';
import Login from './Login/Login';


const Auth = () => {
    return (
        <Router>
            <Switch>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/">
                    <Redirect to="/login"/>
                </Route>
            </Switch>
        </Router>
    )
}

export default Auth;