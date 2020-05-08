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

const ClientsFormComponent = (props) => {
    useEffect(() => {
        (async () => {
            if(!props.blocks || props.lastLoaded !== 'blocks') {
                await props.getBlocks();
            }
        })()
    });
    const {id: paramId} = useParams();
    const [id] = useState(paramId);
    const clientStart = props.clients.find(element => {
        return element.id === +id;
    });
    const [name, setName] = useState(clientStart ? clientStart.name : '');
    const [phoneNumber, setPhoneNumber] = useState(clientStart ? clientStart.phoneNumber : '');
    const [room, setRoom] = useState(clientStart ? clientStart.room : '');
    const [blockId, setBlockId] = useState(clientStart ? clientStart.blockId : '')
    const classes = useStyles();

    const handleSubmit = () => {
        props.clientSubmit({
            id,
            name,
            phoneNumber,
            room,
            blockId,
            new: !paramId
        });
        props.history.push('/reload');
        props.history.replace('/clients');
    }
    console.log(props.blocks, blockId);
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
                <TextField 
                    required
                    type="tel"
                    name="phoneNumber"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    variant="outlined"
                    fullWidth
                    label="Телефон"
                    style={{textAlign:'left'}}
                />
            </FormControl>
            <br />
            <FormControl variant="outlined" className={classes.formControl}>
                <TextField 
                    required
                    name="room"
                    id="room"
                    value={room}
                    onChange={(e) => !isNaN(Number(e.target.value)) && Number(e.target.value) >= 0 ? setRoom(e.target.value) : null}
                    variant="outlined"
                    fullWidth
                    label="Квартира"
                    style={{textAlign:'left'}}
                />
            </FormControl>
            <br />
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="block-select">Дом</InputLabel>
                <Select
                required
                labelId="worker-select"
                id="blockId"
                value={blockId}
                onChange={(event) => {
                    setBlockId(event.target.value);
                    console.log(blockId);
                }
                }
                style={{textAlign:'left'}}
                label="Дом"
                >
                    {
                        props.blocks 
                        ? props.blocks.map(element => <MenuItem value={element.id} key={element.id + element.address}>{element.address}</MenuItem>)
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
                    disabled={!name || !room || !phoneNumber || !blockId}
                >
                Подтвердить
            </Button>
        </div>
    );
}

export default ClientsFormComponent;