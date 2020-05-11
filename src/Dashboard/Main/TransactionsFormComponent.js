import React, { useState, useEffect, } from 'react';
import { FormControl, makeStyles, Button, InputLabel, Select, MenuItem, TextField } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 350,
    },
    center: {
        textAlign: 'center',
        maxWidth: 768,
        margin: '0 auto'
    }
}))

const TransactionsFormComponent = (props) => {
    useEffect(() => {
        if(props.lastLoaded !== 'clients' && props.lastLoaded !== 'workers' && props.lastLoaded !== 'transtypes') {
            props.getWorkers()
            props.getClients();
            props.getTransTypes();
        }
    });
    const {id: paramId} = useParams();
    const [id] = useState(paramId);
    const transactionStart = props.transactions.find(element => {
        return element.id === +id;
    });
    const [clientId, setClientId] = useState(transactionStart ? transactionStart.clientId : '');
    const [workerId, setWorkerId] = useState(transactionStart ? transactionStart.workerId : '');
    const [typeId, setTypeId] = useState(transactionStart ? transactionStart.typeId : '');
    const [total, setTotal] = useState(transactionStart ? transactionStart.total : '');
    const [tranDate, setTranDate] = useState(transactionStart ? transactionStart.tranDate : new Date())
    const classes = useStyles();
    const handleSubmit = () => {
        props.transactionSubmit({
            id,
            clientId,
            workerId,
            typeId,
            total,
            tranDate,
            new: !paramId
        });
        props.history.push('/reload');
        props.history.replace('/transactions');
    }
    return (
        <div className={classes.center}>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="transtype-select">Тип операции</InputLabel>
                <Select
                required
                labelId="transtype-select"
                id="typeId"
                value={typeId}
                onChange={(event) => {
                    setTypeId(event.target.value);
                }
                }
                style={{textAlign:'left'}}
                label="Тип операции"
                >
                    {
                        props.transtypes 
                        ? props.transtypes.map(element => <MenuItem value={element.id} key={element.id + element.type}>{element.type}</MenuItem>)
                        : null
                    }
                </Select>
            </FormControl>
            <br />
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="client-select">Клиент</InputLabel>
                <Select
                required
                labelId="client-select"
                id="clientId"
                value={clientId}
                onChange={(event) => {
                    setClientId(event.target.value);
                }
                }
                style={{textAlign:'left'}}
                label="Клиент"
                >
                    {
                        props.clients 
                        ? props.clients.map(element => <MenuItem value={element.id} key={element.id + element.name}>{element.name}</MenuItem>)
                        : null
                    }
                </Select>
            </FormControl>
            <br />
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="worker-select">Сотрудник</InputLabel>
                <Select
                required
                labelId="worker-select"
                id="workerId"
                value={workerId}
                onChange={(event) => {
                    setWorkerId(event.target.value);
                }
                }
                style={{textAlign:'left'}}
                label="Сотрудник"
                >
                    {
                        props.workers 
                        ? props.workers.map(element => <MenuItem value={element.id} key={element.id + element.name}>{element.name}</MenuItem>)
                        : null
                    }
                </Select>
            </FormControl>
            <br />
            <FormControl variant="outlined" className={classes.formControl}>
                <TextField 
                    required
                    name="total"
                    id="total"
                    value={total}
                    onChange={(e) => setTotal(e.target.value)}
                    variant="outlined"
                    fullWidth
                    label="Стоимость"
                    style={{textAlign:'left'}}
                />
            </FormControl>
            <br />
            <FormControl variant="outlined" className={classes.formControl}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker value={tranDate} onChange={setTranDate} fullWidth/>
                </MuiPickersUtilsProvider>
            </FormControl>
            <br />
            <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    className={classes.formControl}
                    disabled={!workerId || !clientId || !total || !tranDate || !typeId}
                >
                Подтвердить
            </Button>
        </div>
    );
}

export default TransactionsFormComponent;