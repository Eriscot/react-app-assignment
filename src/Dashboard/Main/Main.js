import React from 'react';
import { Container, makeStyles } from '@material-ui/core';
import { Switch, Route } from 'react-router-dom';
import Magazines from './Magazines';

const useStyles = makeStyles(theme => (
    {
        main: {
            margin: '24px auto'
        }
    }
));

export default function() {
    const classes = useStyles();
    return(
        <main>
            <Container maxWidth="lg" className={classes.main}>
                <Switch>
                    <Route path="/magazines">
                        <Magazines />
                    </Route>
                </Switch>
            </Container>
        </main>
    )
}