import React, { useState, } from 'react';
import { FormControl, TextField, makeStyles, Button } from '@material-ui/core';
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

const OrderTypeFormComponent = (props) => {
    console.log(props);
    const {id: paramId} = useParams();
    const [id] = useState(paramId);
    const orderTypeStart = props.ordertypes.find(element => {
        return element.id === +id;
    });
    const [type, setType] = useState(orderTypeStart ? orderTypeStart.type : '');
    const classes = useStyles();

    const handleSubmit = () => {
        props.orderTypeSubmit({
            id,
            type,
            new: !paramId
        });
        props.history.push('/reload');
        props.history.replace('/ordertypes');
    }

    return (
        <div className={classes.center}>
                <FormControl variant="outlined" className={classes.formControl}>
                    <TextField 
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="type"
                    name="type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    label="Название"
                    style={{textAlign: 'left'}}/>
                </FormControl>
                <br />
                <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        className={classes.formControl}
                    >
                    Подтвердить
                </Button>

        </div>
    );
}

export default OrderTypeFormComponent;