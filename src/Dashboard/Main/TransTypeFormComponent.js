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

const TransTypeFormComponent = (props) => {
    const {id: paramId} = useParams();
    const [id] = useState(paramId);
    const transTypeStart = props.table.values.find(element => {
        return element.id === +id;
    });
    const [type, setType] = useState(transTypeStart ? transTypeStart.type : '');
    const [cost, setCost] = useState(transTypeStart ? transTypeStart.cost : 0);
    const classes = useStyles();

    const handleSubmit = () => {
        props.transTypeSubmit({
            id,
            type,
            cost,
            new: !paramId
        });
        props.history.push('/reload');
        props.history.replace('/transtypes');
    }

    return (
        <div className={classes.center}>
                <FormControl variant="outlined" className={classes.formControl}>
                    <TextField 
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    required
                    id="type"
                    name="type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    label="Название"
                    style={{textAlign: 'left'}}/>
                </FormControl>
                <br />
                <FormControl variant="outlined" className={classes.formControl}>
                    <TextField 
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    required
                    id="cost"
                    name="cost"
                    value={cost}
                    onChange={(e) => {
                        if(!isNaN(Number(e.target.value))) {
                            setCost(e.target.value);
                        }
                    }}
                    label="Комиссия"
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

export default TransTypeFormComponent;