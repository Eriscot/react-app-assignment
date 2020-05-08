import React, { useEffect } from 'react';
import Table from './Table';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const SubscriptionsComponent = props => {
    let header, rows;
    console.log(props);
    useEffect(() => {
        (async () => {
            console.log('test');
            if(!props.subscriptions || props.lastLoaded !== 'subscriptions') {
                await props.getSubscriptions();
            }
        })()
    });
    if(props.subscriptions) {
        header = ['ФИО сотрудника', 'ФИО клиента', 'Название', 'Начало подписки', 'Конец подписки', 'Сумма'];
        rows = props.subscriptions.map(row => {
            return Object.keys(row).map(key => ({
                value: row[key]
            }));
        });
    }
    // rows={rows}
    return (
        <>
            <Table header={header} rows={rows}/>
            <div style={{width: '100%', textAlign: 'center'}}>
                <Fab color="primary" style={{
                    margin: '20px auto',
                    textAlign: 'center'
                }}>
                    <AddIcon />
                </Fab>
            </div>
        </>
    );
}

export default SubscriptionsComponent;