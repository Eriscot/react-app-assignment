import React from 'react';
import { Container, makeStyles } from '@material-ui/core';
import { Switch, Route } from 'react-router-dom';
import Magazines from './Magazines';
import Positions from './Positions';
import TransTypes from './TransTypes';
import MagazineTypes from './MagazineTypes';
import OrderTypes from './OrderTypes';
import Districts from './Districts';
import Blocks from './Blocks';
import Clients from './Clients';
import Transactions from './Transactions';
import Pensions from './Pensions';
import Subscriptions from './Subscriptions';
import Orders from './Orders';
import Workers from './Workers';
import PositionForm from './PositionForm';
import MagazineTypeForm from './MagazineTypeForm';
import OrderTypeForm from './OrderTypeForm';
import TransTypeForm from './TransTypeForm';

const useStyles = makeStyles(theme => (
    {
        main: {
            margin: '24px auto',
            textAlign: "center"
        }
    }
));

export default function() {
    const classes = useStyles();
    return(
        <main>
            <Container maxWidth="xl" className={classes.main}>
                <Switch>
                    <Route path="/magazines">
                        <Magazines />
                    </Route>
                    <Route path="/positions/new">
                        <PositionForm />
                    </Route>
                    <Route path="/positions/:id">
                        <PositionForm />
                    </Route>
                    <Route path="/positions">
                        <Positions />
                    </Route>
                    <Route path="/transtypes/new">
                        <TransTypeForm />
                    </Route>
                    <Route path="/transtypes/:id">
                        <TransTypeForm />
                    </Route>
                    <Route path="/transtypes">
                        <TransTypes />
                    </Route>
                    <Route path="/ordertypes/new">
                        <OrderTypeForm />
                    </Route>
                    <Route path="/ordertypes/:id">
                        <OrderTypeForm />
                    </Route>
                    <Route path="/ordertypes">
                        <OrderTypes />
                    </Route>
                    <Route path="/magazinetypes/new">
                        <MagazineTypeForm />
                    </Route>
                    <Route path="/magazinetypes/:id">
                        <MagazineTypeForm />
                    </Route>
                    <Route path="/magazinetypes">
                        <MagazineTypes />
                    </Route>
                    <Route path="/districts">
                        <Districts />
                    </Route>
                    <Route path="/blocks">
                        <Blocks />
                    </Route>
                    <Route path="/clients">
                        <Clients />
                    </Route>
                    <Route path="/transactions">
                        <Transactions />
                    </Route>
                    <Route path="/pensions">
                        <Pensions />
                    </Route>
                    <Route path="/subscriptions">
                        <Subscriptions />
                    </Route>
                    <Route path="/orders">
                        <Orders />
                    </Route>
                    <Route path="/workers">
                        <Workers />
                    </Route>
                    <Route path="/test">
                        <PositionForm />
                    </Route>
                </Switch>
            </Container>
        </main>
    )
}