import React, { useEffect } from 'react';
import Table from './Table';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const TransactionsComponent = props => {
    let header, rows;
    useEffect(() => {
        (async () => {
            if(!props.transactions || props.lastLoaded !== 'transactions') {
                await props.getTransactions();
            }
        })()
    });
    if(props.transactions) {
        header = ['Тип операции', 'ФИО сотрудника', 'ФИО Клиента', 'Сумма', 'Дата проведения'];
        rows = props.transactions.map(row => {
            return Object.keys(row).map(key => ({value: row[key]}));
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

export default TransactionsComponent;