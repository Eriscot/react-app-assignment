import React from 'react';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, makeStyles } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(0, 2),
    },
    center: {
        textAlign: 'center'
    }
}))

const TableComponent = props => {
    const classes = useStyles();

    const deleteHandler = (id) => {
        switch(props.location.pathname){
            case '/positions':
                props.positionDelete({
                    id
                })
                break;
            case '/magazinetypes':
                props.magazineTypeDelete({
                    id
                });
                break;
            case '/ordertypes':
                props.orderTypeDelete({
                    id
                });
                break;
            case '/transtypes':
                props.transTypeDelete({
                    id
                })
                break;
            default:
                return;
        }
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {   props.header ? 
                            props.header.map((element, index) => {
                                return <TableCell
                                    colSpan={index === props.header.length - 1 ? 2 : 1}
                                    key={element}>{element}</TableCell>
                            }) : null
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {   props.rows ? 
                        props.rows.map(row => {
                            return (
                                <TableRow key={row[0].value}>
                                    {
                                        row.map((cell, index) => {
                                            return index ? <TableCell
                                            key={cell.value}>{cell.value instanceof Date ? cell.value.toDateString() : (cell.value || '-')}</TableCell> : null;
                                        })
                                    }
                                    <TableCell
                                        className={classes.center}
                                        >
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            startIcon={<EditIcon />}
                                            className={classes.button}
                                            onClick={() => {
                                                props.history.push(props.location.pathname + '/' + row[0].value);
                                            }}
                                            >
                                            Редактировать
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            className={classes.button}
                                            startIcon={<DeleteIcon />}
                                            onClick={() => {
                                                console.log(row);
                                                // eslint-disable-next-line no-restricted-globals
                                                if(confirm('Вы действительно хотите удалить запись?')) deleteHandler(row[0].value);
                                            }}
                                            >
                                            Удалить
                                        </Button>
                                    </TableCell>
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