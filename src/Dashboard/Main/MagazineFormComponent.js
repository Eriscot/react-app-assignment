import React, { useState, useEffect, } from 'react';
import { FormControl, TextField, makeStyles, Button, InputLabel, Select, MenuItem } from '@material-ui/core';
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

const MagazineFormComponent = (props) => {
    const {id: paramId} = useParams();
    const [id] = useState(paramId);
    const magazineStart = props.magazines.find(element => {
        return element.id === +id;
    });
    const [name, setName] = useState(magazineStart ? magazineStart.name : '')
    const [typeId, setTypeId] = useState(magazineStart ? magazineStart.typeId : '');
    const classes = useStyles();
    useEffect(() => {
        (async () => {
            if(!props.magazinetypes || props.lastLoaded !== 'magazinetypes') {
                await props.getMagazineTypes();
            }
        })()
    });

    const handleSubmit = () => {
        props.magazineSubmit({
            id,
            name,
            typeId,
            new: !paramId
        });
        props.history.push('/reload');
        props.history.replace('/magazines');
    }
    console.log(magazineStart);
    return (
        <div className={classes.center}>
                <FormControl variant="outlined" className={classes.formControl}>
                    <TextField 
                    required
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    label="Название"
                    style={{textAlign: 'left'}}/>
                </FormControl>
                <br />
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="magazinetype-select">Тип издания</InputLabel>
                    <Select
                    labelId="magazinetype-select"
                    id="typeId"
                    name="typeId"
                    value={typeId}
                    onChange={(e) => setTypeId(e.target.value)}
                    style={{textAlign: 'left'}}
                    label="Тип издания"
                    >
                        {
                            props.magazinetypes 
                            ? props.magazinetypes.map(element => <MenuItem value={element.id} key={element.id + element.type}>{element.type}</MenuItem>)
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
                        disabled={!typeId || !name}
                    >
                    Подтвердить
                </Button>

        </div>
    );
}

export default MagazineFormComponent;