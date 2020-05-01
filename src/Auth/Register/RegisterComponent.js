import React from 'react';
import AuthFormComponent from '../AuthFormComponent';
import { TextField, Button, Container, CssBaseline, Avatar, Typography, makeStyles } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';

const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.grey,
    },
    submit: {
        margin: theme.spacing(1, 0, 1),
    },
    inside: {
        padding: theme.spacing(4)
    },
    link: {
        margin: theme.spacing(1, 0, 1)
    }
}));

const RegisterComponent = (props) => {
    
    const classes = useStyles();

        // return (
        //     <AuthFormComponent>
        //         <TextField 
        //             type="text" 
        //             label="Никнейм" 
        //         />
        //         <TextField type="text" label="ФИО" />
        //         <TextField type="password" label="Пароль" />
        //         <br />
        //         <Button variant="contained" color="primary" >Подтвердить</Button>
        //     </AuthFormComponent>
        // );

    return (
        <AuthFormComponent>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                {/* <Paper
                    className={classes.inside}> */}
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <PersonIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Регистрация
                        </Typography>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="nickname"
                            label="Никнейм"
                            name="nickname"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Пароль"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Зарегистрироваться
                        </Button>
                    </div>
            </Container>
        </AuthFormComponent>
    );
}

export default RegisterComponent;