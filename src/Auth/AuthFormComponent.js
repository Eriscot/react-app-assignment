import React from 'react';
import './AuthForm.css'
import { CssBaseline, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    formCenter: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh'
    },
    form: {
        width: '100%', // Fix IE 11 issue.
    }
}));

const AuthFormComponent = (props) => {
    const classes = useStyles();
    return (
        <>
            <CssBaseline />
            <div className={classes.formCenter}>
                <div className="form">
                    <form className={classes.form}>
                        {props.children}
                    </form>
                </div>
            </div>
        </>
    );
}

export default AuthFormComponent;