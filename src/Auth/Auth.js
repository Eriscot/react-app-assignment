import React from 'react'
import {Route, Redirect, Switch, BrowserRouter as Router, NavLink} from 'react-router-dom';
import Register from './Register/Register';
import Login from './Login/Login';
import { IconButton, makeStyles } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyle = makeStyles(theme => ({
    backLink: {
        marginRight: 'auto' 
    }
}));

const Auth = () => {
    const classes = useStyle()
    return (
        <Router>
            <Switch>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/register">
                <NavLink to="/"
                    className={classes.backLink}>
                    <IconButton>
                            <ArrowBackIcon />
                    </IconButton>
                </NavLink>
                <Register />
                </Route>
                <Route path="/">
                    <Redirect to="/login"/>
                </Route>
            </Switch>
        </Router>
    )
}

export default Auth;