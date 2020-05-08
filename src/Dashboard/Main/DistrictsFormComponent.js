import React, { useState, useEffect, } from 'react';
import { FormControl, makeStyles, Button, InputLabel, Select, MenuItem } from '@material-ui/core';
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

const DistrictsFormComponent = (props) => {
    useEffect(() => {
        (async () => {
            if(!props.workers || props.lastLoaded !== 'workers') {
                await props.getWorkers();
            }
        })()
    });
    const {id: paramId} = useParams();
    const [id] = useState(paramId);
    const districtStart = props.districts.find(element => {
        return element.id === +id;
    });
    console.log(districtStart);
    const [workerId, setWorkerId] = useState(districtStart ? districtStart.workerId : '');
    const classes = useStyles();

    const handleSubmit = () => {
        props.districtSubmit({
            id,
            workerId,
            new: !paramId
        });
        props.history.push('/reload');
        props.history.replace('/districts');
    }
    console.log(!!workerId);
    return (
        <div className={classes.center}>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="worker-select">Сотрудник</InputLabel>
                <Select
                labelId="worker-select"
                id="workerId"
                value={workerId}
                onChange={(event) => setWorkerId(event.target.value)}
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
            <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    className={classes.formControl}
                    disabled={!workerId}
                >
                Подтвердить
            </Button>
        </div>
    );
}

export default DistrictsFormComponent;