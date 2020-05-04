import React from 'react';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';

const TableComponent = props => {
    console.log(props);
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {   props.header ? 
                            props.header.map(element => {
                                return <TableCell>{element}</TableCell>
                            }) : null
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {   props.rows ? 
                        props.rows.map(row => {
                            return (
                                <TableRow>
                                    {
                                        row.map(cell => {
                                            return <TableCell>{cell.value}</TableCell>
                                        })
                                    }
                                </TableRow>
                            )
                        }) : null
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TableComponent;