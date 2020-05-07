import React, { useEffect } from 'react';
import Table from './Table';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const OrdersComponent = props => {
    let header, rows;
    console.log(props);
    useEffect(() => {
        (async () => {
            if(!props.table || props.table.title !== 'orders') {
                await props.getOrders();
            }
        })()
    });
    if(props.table) {
        console.log(props.table);
        header = ['Тип посылки','Отправитель','ФИО клиента','Вес','Стоимость','Дата получения'];
        rows = props.table.values.map(row => {
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
                >
                    <AddIcon />
                </Fab>
            </div>
        </>
    );
}

export default OrdersComponent;