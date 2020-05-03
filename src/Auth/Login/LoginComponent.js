import React from 'react';
import { Button, TextField, Container, CssBaseline, Avatar, Typography, makeStyles} from '@material-ui/core/';
import { Link as RouterLink} from 'react-router-dom';
import AuthFormComponent from '../AuthFormComponent';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const LoginComponent = (props) => {
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
        },
        input: {
            display: 'none'
        }
    }));
    const classes = useStyles();

    const [nickname, setNickname] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleSubmit() {
        props.userLogin({
            nickname,
            password
        })
    }

    return (
        <>
        <AuthFormComponent>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            {/* <Paper
                className={classes.inside}> */}
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                    Вход
                    </Typography>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="nickname"
                        label="Никнейм"
                        name="nickname"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        label="Пароль"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <RouterLink 
                            to="/register"
                    >
                        Регистрация
                    </RouterLink>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}
                    >
                        Вход
                    </Button>
                </div>
        </Container>
        </AuthFormComponent>
        </>
    );
}

export default LoginComponent;