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

const SubscriptionsFormComponent = (props) => {
    useEffect(() => {
        if(props.lastLoaded !== 'clients' && props.lastLoaded !== 'workers' && props.lastLoaded !== 'magazines') {
            props.getWorkers()
            props.getClients();
            props.getMagazines();
        }
    });
    const {id: paramId} = useParams();
    const [id] = useState(paramId);
    const subscriptionStart = props.subscriptions.find(element => {
        return element.id === +id;
    });
    const [clientId, setClientId] = useState(subscriptionStart ? subscriptionStart.clientId : '');
    const [workerId, setWorkerId] = useState(subscriptionStart ? subscriptionStart.workerId : '');
    const [magazineId, setMagazineId] = useState(subscriptionStart ? subscriptionStart.magazineId : '');
    const [subBegin, setSubBegin] = useState(subscriptionStart ? subscriptionStart.subBegin : new Date());
    const [subEnd, setSubEnd] = useState(subscriptionStart ? subscriptionStart.subEnd : new Date());
    const [total, setTotal] = useState(subscriptionStart ? subscriptionStart.total : '');
    const classes = useStyles();
    const handleSubmit = () => {
        props.subscriptionSubmit({
            id,
            clientId,
            workerId,
            magazineId,
            subBegin,
            subEnd,
            total,
            new: !paramId
        });
        props.history.push('/reload');
        props.history.replace('/subscriptions');
    }
    return (
        <div className={classes.center}>
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
                <InputLabel id="magazine-select">Издание</InputLabel>
                <Select
                required
                labelId="magazine-select"
                id="magazineId"
                value={magazineId}
                onChange={(event) => {
                    setMagazineId(event.target.value);
                }
                }
                style={{textAlign:'left'}}
                label="Издание"
                >
                    {
                        props.magazines 
                        ? props.magazines.map(element => <MenuItem value={element.id} key={element.id + element.name}>{element.name}</MenuItem>)
                        : null
                    }
                </Select>
            </FormControl>
            <br />
            <FormControl variant="outlined" className={classes.formControl}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker 
                        value={subBegin} 
                        onChange={setSubBegin} 
                        fullWidth
                        maxDate={subEnd}
                        label="Начало подписки"/>
                </MuiPickersUtilsProvider>
            </FormControl>
            <br />
            <FormControl variant="outlined" className={classes.formControl}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker 
                        value={subEnd} 
                        onChange={setSubEnd} 
                        fullWidth
                        minDate={subBegin}
                        label="Конец подписки"/>
                </MuiPickersUtilsProvider>
            </FormControl>
            <br />
            <FormControl variant="outlined" className={classes.formControl}>
                <TextField 
                    required
                    name="total"
                    id="total"
                    value={total}
                    onChange={(e) => {
                        if(!isNaN(Number(e.target.value))) {
                            setTotal(e.target.value);
                        }
                    }}
                    variant="outlined"
                    fullWidth
                    label="Стоимость"
                    style={{textAlign:'left'}}
                />
            </FormControl>
            <br />
            <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    className={classes.formControl}
                    disabled={!workerId || !clientId || !magazineId || !total || !subBegin || !subEnd}
                >
                Подтвердить
            </Button>
        </div>
    );
}

export default SubscriptionsFormComponent;