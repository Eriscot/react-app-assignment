import React, { useEffect } from 'react';
import Table from './Table';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const PensionsComponent = props => {
    let header, rows;
    console.log(props);
    useEffect(() => {
        (async () => {
            console.log('in pensions');
            if(!props.table || props.table.title !== 'pensions') {
                await props.getPensions();
            }
        })()
    });
    if(props.table) {
        console.log(props.table);
        header = ['ФИО клиента', 'ФИО сотрудника', 'Сумма', 'Дата получения'];
        rows = props.table.values.map(row => {
            return Object.keys(row).map(key => ({
                value: row[key]
            }));
        });
    }
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

export default PensionsComponent;