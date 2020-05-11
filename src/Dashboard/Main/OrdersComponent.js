import React, { useEffect } from 'react';
import Table from './Table';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const OrdersComponent = props => {
    let header, rows;
    console.log(props);
    useEffect(() => {
        (async () => {
            if(!props.orders || props.lastLoaded !== 'orders') {
                await props.getOrders();
            }
        })()
    });
    if(props.orders) {
        header = ['Тип посылки','Отправитель','ФИО клиента','Вес','Стоимость','Дата получения'];
        rows = props.orders.map(row => {
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
                }}
                onClick={() => props.history.push(props.location.pathname + '/new')}
                >
                    <AddIcon />
                </Fab>
            </div>
        </>
    );
}

export default OrdersComponent;