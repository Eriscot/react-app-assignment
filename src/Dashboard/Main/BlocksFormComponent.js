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

const BlockFormComponent = (props) => {
    useEffect(() => {
        (async () => {
            if(!props.districts || props.lastLoaded !== 'districts') {
                await props.getDistricts();
            }
        })()
    });
    const {id: paramId} = useParams();
    const [id] = useState(paramId);
    const blockStart = props.blocks.find(element => {
        return element.id === +id;
    });
    const [address, setAddress] = useState(blockStart ? blockStart.address : '');
    const [distId, setDistId] = useState(blockStart ? blockStart.distId : '');
    const classes = useStyles();

    const handleSubmit = () => {
        props.blockSubmit({
            id,
            address,
            distId,
            new: !paramId
        });
        props.history.push('/reload');
        props.history.replace('/blocks');
    }

    return (
        <div className={classes.center}>
            <FormControl variant="outlined" className={classes.formControl}>
                <TextField 
                    name="address"
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    variant="outlined"
                    fullWidth
                    label="Адрес"
                    style={{textAlign:'left'}}
                />
            </FormControl>
            <br />
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="district-select">Номер участка</InputLabel>
                <Select
                labelId="district-select"
                id="distId"
                value={distId}
                onChange={(event) => setDistId(event.target.value)}
                style={{textAlign:'left'}}
                label="Номер участка"
                >
                    {
                        props.districts 
                        ? props.districts.map(element => <MenuItem value={element.id} key={element.id}>{element.id}</MenuItem>)
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
                    disabled={!address || !distId}
                >
                Подтвердить
            </Button>
        </div>
    );
}

export default BlockFormComponent;