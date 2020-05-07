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

const MagazineTypeFormComponent = (props) => {
    const {id: paramId} = useParams();
    const [id] = useState(paramId);
    const magazineTypeStart = props.table.values.find(element => {
        return element.id === +id;
    });
    const [type, setType] = useState(magazineTypeStart ? magazineTypeStart.type : '');
    const classes = useStyles();

    const handleSubmit = () => {
        props.magazineTypeSubmit({
            id,
            type,
            new: !paramId
        });
        props.history.push('/reload');
        props.history.replace('/magazinetypes');
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

export default MagazineTypeFormComponent;