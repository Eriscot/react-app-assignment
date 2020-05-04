import React, { useEffect } from 'react';
import Table from './Table';

const MagazinesComponent = props => {
    let header, rows;
    useEffect(() => {
        (async () => {
            if(!props.table || props.table.title !== 'magazines') {
                await props.getMagazines();
            }
        })()
    });
    if(props.table) {
        header = ['Код', 'Название', 'Тип издания'];
        rows = props.table.values.map(row => {
            return Object.keys(row).map(key => ({value: row[key]}));
        });
    }
    // rows={rows}
    return <Table header={header} rows={rows}/>
}

export default MagazinesComponent;