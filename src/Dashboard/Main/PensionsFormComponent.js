import React, { useState, useEffect, } from 'react';
import { FormControl, makeStyles, Button, InputLabel, Select, MenuItem, TextField } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
    DatePicker,
    MuiPickersUtilsProvider,
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

const PensionsFormComponent = (props) => {
    useEffect(() => {
        (async () => {
            if(!props.clients || props.lastLoaded !== 'clients') {
                await props.getClients();
            }
            if(!props.workers || props.lastLoaded !== 'workers') {
                await props.getWorkers();
            }
        })()
    });
    const {id: paramId} = useParams();
    const [id] = useState(paramId);
    const pensionStart = props.pensions.find(element => {
        return element.id === +id;
    });
    const [clientId, setClientId] = useState(pensionStart ? pensionStart.clientId : '');
    const [workerId, setWorkerId] = useState(pensionStart ? pensionStart.workerId : '');
    const [total, setTotal] = useState(pensionStart ? pensionStart.total : '');
    const [date, setDate] = useState(pensionStart ? pensionStart.date : new Date())
    const classes = useStyles();
    console.log(date);
    const handleSubmit = () => {
        props.clientSubmit({
            id,
            clientId,
            workerId,
            total,
            date,
            new: !paramId
        });
        props.history.push('/reload');
        props.history.replace('/pensions');
    }
    return (
        <div className={classes.center}>
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
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker value={date} onChange={setDate}/>
            </MuiPickersUtilsProvider>
            
            <br />
            <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    className={classes.formControl}
                    disabled={!workerId || !clientId || !total || !date}
                >
                Подтвердить
            </Button>
        </div>
    );
}

export default PensionsFormComponent;