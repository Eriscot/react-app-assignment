import React, { useState, useEffect, } from 'react';
import { FormControl, makeStyles, Button, InputLabel, Select, MenuItem, TextField } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
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

const OrdersFormComponent = (props) => {
    console.log(props);
    useEffect(() => {
        if(props.lastLoaded !== 'clients' && props.lastLoaded !== 'ordertypes') {
            props.getOrderTypes();
            props.getClients();
        }
    });
    const {id: paramId} = useParams();
    const [id] = useState(paramId);
    const orderStart = props.orders.find(element => {
        return element.id === +id;
    });
    const [typeId, setTypeId] = useState(orderStart ? orderStart.typeId : '');
    const [sender, setSender] = useState(orderStart ? orderStart.sender : '');
    const [clientId, setClientId] = useState(orderStart ? orderStart.clientId : '');
    const [weight, setWeight] = useState(orderStart ? orderStart.weight : '');
    const [cost, setCost] = useState(orderStart ? orderStart.cost : '');
    const [pickupDate, setPickupDate] = useState(orderStart ? orderStart.pickupDate : new Date());
    const classes = useStyles();
    const handleSubmit = () => {
        props.orderSubmit({
            id,
            typeId,
            sender,
            clientId,
            weight,
            cost,
            pickupDate,
            new: !paramId
        });
        props.history.push('/reload');
        props.history.replace('/orders');
    }
    return (
        <div className={classes.center}>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="type-select">Тип посылки</InputLabel>
                <Select
                required
                labelId="type-select"
                id="typeId"
                value={typeId}
                onChange={(event) => {
                    setTypeId(event.target.value);
                }
                }
                style={{textAlign:'left'}}
                label="Тип посылки"
                >
                    {
                        props.ordertypes 
                        ? props.ordertypes.map(element => <MenuItem value={element.id} key={element.id + element.type}>{element.type}</MenuItem>)
                        : null
                    }
                </Select>
            </FormControl>
            <br />
            <FormControl variant="outlined" className={classes.formControl}>
                <TextField 
                    required
                    name="sender"
                    id="sender"
                    value={sender}
                    onChange={(e) => setSender(e.target.value) }
                    variant="outlined"
                    fullWidth
                    label="Отправитель"
                    style={{textAlign:'left'}}
                />
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
                <TextField 
                    required
                    name="weight"
                    id="weight"
                    value={weight}
                    onChange={(e) => {
                        if(!isNaN(Number(e.target.value))) {
                            setWeight(e.target.value);
                        }
                    }}
                    variant="outlined"
                    fullWidth
                    label="Вес"
                    style={{textAlign:'left'}}
                />
            </FormControl>
            <br />
            <FormControl variant="outlined" className={classes.formControl}>
                <TextField 
                    required
                    name="cost"
                    id="cost"
                    value={cost}
                    onChange={(e) => {
                        if(!isNaN(Number(e.target.value))) {
                            setCost(e.target.value);
                        }
                    }}
                    variant="outlined"
                    fullWidth
                    label="Стоимость"
                    style={{textAlign:'left'}}
                />
            </FormControl>
            <br />
            <FormControl variant="outlined" className={classes.formControl}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker 
                        value={pickupDate} 
                        onChange={setPickupDate} 
                        fullWidth
                        label="Дата получения"/>
                </MuiPickersUtilsProvider>
            </FormControl>
            <br />
            <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    className={classes.formControl}
                    disabled={!typeId || !clientId || !sender || !weight || !cost || !pickupDate}
                >
                Подтвердить
            </Button>
        </div>
    );
}

export default OrdersFormComponent;