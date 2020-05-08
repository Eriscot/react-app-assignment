import React, { useEffect } from 'react';
import Table from './Table';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const MagazinesComponent = props => {
    let header, rows;
    useEffect(() => {
        (async () => {
            if(!props.magazines || props.lastLoaded !== 'magazines') {
                await props.getMagazines();
            }
        })()
    });
    if(props.magazines) {
        header = ['Название', 'Тип издания'];
        rows = props.magazines.map(row => {
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
                onClick={() => props.history.push(props.location.pathname + '/new')}
                >
                    <AddIcon />
                </Fab>
            </div>
        </>
    );
}

export default MagazinesComponent;