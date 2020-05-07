import React, { useEffect } from 'react';
import Table from './Table';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const OrderTypesComponent = props => {
    let header, rows;
    console.log(props);
    useEffect(() => {
        (async () => {
            if(!props.table || props.table.title !== 'ordertypes') {
                await props.getOrderTypes();
            }
        })()
    });
    if(props.table) {
        header = ['Название'];
        rows = props.table.values.map(row => {
            return Object.keys(row).map(key => ({value: row[key]}));
        });
    }
    return (
        <>
            <Table header={header} rows={rows}/>
            <div style={{width: '100%', textAlign: 'center'}}>
                <Fab color="primary" style={{
                    margin: '20px auto',
                    textAlign: 'center'
                }}
                onClick={() => props.history.push(props.location.pathname + '/new')}>
                    <AddIcon />
                </Fab>
            </div>
        </>
    );
}

export default OrderTypesComponent;