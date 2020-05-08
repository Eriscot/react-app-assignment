import React, { useState, useEffect, } from 'react';
import { FormControl, makeStyles, Button, InputLabel, Select, MenuItem, TextField } from '@material-ui/core';
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

const WorkersFormComponent = (props) => {
    useEffect(() => {
        (async () => {
            if(!props.positions || props.lastLoaded !== 'positions') {
                await props.getPositions();
            }
        })()
    });
    const {id: paramId} = useParams();
    const [id] = useState(paramId);
    const workerStart = props.workers.find(element => {
        return element.id === +id;
    });
    const [name, setName] = useState(workerStart ? workerStart.name : '');
    const [positionId, setPositionId] = useState(workerStart ? workerStart.positionId : '');
    const [phoneNumber, setPhoneNumber] = useState(workerStart ? workerStart.phoneNumber : '');
    const classes = useStyles();

    const handleSubmit = () => {
        props.workerSubmit({
            id,
            name,
            positionId,
            phoneNumber,
            new: !paramId
        });
        props.history.push('/reload');
        props.history.replace('/workers');
    }

    return (
        <div className={classes.center}>
            <FormControl variant="outlined" className={classes.formControl}>
                <TextField 
                    required
                    name="name"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    variant="outlined"
                    fullWidth
                    label="ФИО"
                    style={{textAlign:'left'}}
                />
            </FormControl>
            <br />
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="worker-select">Должность</InputLabel>
                <Select
                required
                labelId="worker-select"
                id="positionId"
                value={positionId}
                onChange={(event) => setPositionId(event.target.value)}
                style={{textAlign:'left'}}
                label="Должность"
                >
                    {
                        props.positions 
                        ? props.positions.map(element => <MenuItem value={element.id} key={element.id}>{element.position}</MenuItem>)
                        : null
                    }
                </Select>
            </FormControl>
            <br />
            <FormControl variant="outlined" className={classes.formControl}>
                <TextField 
                    type="tel"
                    required
                    name="phoneNumber"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    variant="outlined"
                    fullWidth
                    label="Номер телефона"
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
                    disabled={!name || !positionId || !phoneNumber}
                >
                Подтвердить
            </Button>
        </div>
    );
}

export default WorkersFormComponent;