import React, { useEffect } from 'react';
import Table from './Table';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';;

const ClientsComponent = props => {
    let header, rows;
    useEffect(() => {
        (async () => {
            if(!props.table || props.table.title !== 'clients') {
                await props.getClients();
            }
        })()
    });
    if(props.table) {
        header = ['ФИО', 'Номер телефона', 'Квартира', 'Адрес'];
        rows = props.table.values.map(row => {
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

export default ClientsComponent;