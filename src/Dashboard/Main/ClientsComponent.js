import React, { useEffect } from 'react';
import Table from './Table';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';;

const ClientsComponent = props => {
    let header, rows;
    useEffect(() => {
        (async () => {
            if(!props.clients || props.lastLoaded !== 'clients') {
                await props.getClients();
            }
        })()
    });
    if(props.clients) {
        header = ['ФИО', 'Номер телефона', 'Квартира', 'Адрес'];
        rows = props.clients.map(row => {
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
                }}
                onClick={() => props.history.push(props.location.pathname + '/new')}
                >
                    <AddIcon />
                </Fab>
            </div>
        </>
    );
}

export default ClientsComponent;