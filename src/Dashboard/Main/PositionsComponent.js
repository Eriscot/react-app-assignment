import React, { useEffect } from 'react';
import Table from './Table';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const PositionsComponent = props => {
    let header, rows;
    console.log(props);
    useEffect(() => {
        (async () => {
            console.log(props);
            if(!props.positions || props.lastLoaded !== 'positions') {
                await props.getPositions();
            }
        })()
    });
    if(props.positions) {
        header = ['Должность'];
        rows = props.positions.map(row => {
            return Object.keys(row).map(key => ({value: row[key]}));
        });
    }
    // rows={rows}
    return (
        <>
            <Table header={header} rows={rows}/>
            <div style={{width: '100%', textAlign: 'center'}}>
                <Fab color="primary" style={{
                    margin: '20px auto'
                }}
                onClick={() => props.history.push(props.location.pathname + '/new')}>
                    <AddIcon />
                </Fab>
            </div>
        </>
    );
}

export default PositionsComponent;