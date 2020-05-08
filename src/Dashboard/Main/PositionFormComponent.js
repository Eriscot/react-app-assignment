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

const PositionFormComponent = (props) => {
    const {id: paramId} = useParams();
    const [id] = useState(paramId);
    const positionStart = props.positions.find(element => {
        return element.id === +id;
    });
    const [position, setPosition] = useState(positionStart ? positionStart.position : '');
    const classes = useStyles();

    const handleSubmit = () => {
        props.positionSubmit({
            id,
            position,
            new: !paramId
        });
        console.log('test');
        props.history.push('/reload');
        props.history.replace('/positions');
    }

    return (
        <div className={classes.center}>
                <FormControl variant="outlined" className={classes.formControl}>
                    <TextField 
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    required
                    id="position"
                    name="position"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    label="Должность"
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

export default PositionFormComponent;