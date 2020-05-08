import React, { useEffect } from 'react';
import Table from './Table';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const WorkersComponent = props => {
    let header, rows;
    console.log(props);
    useEffect(() => {
        (async () => {
            if(!props.workers || props.lastLoaded !== 'workers') {
                await props.getWorkers();
            }
        })()
    });
    if(props.workers) {
        console.log(props.table);
        header = ['ФИО', 'Должность', 'Номер телефона'];
        rows = props.workers.map(row => {
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

export default WorkersComponent;