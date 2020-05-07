import React, { useEffect, useState } from 'react';
import './App.css';
import Dashboard from './Dashboard/Dashboard';
import Auth from './Auth/Auth';
import Loader from 'react-loader-spinner';
import { CssBaseline, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function AppComponent(props) {
	const [open, setOpen] = useState(false);
	useEffect(() => {
		setOpen(props.error ? true : false);
	}, [props.error]);
	const handleError = () => {
		props.errorOff();
		setOpen(false);
	}
	console.log(props);
	return (
		<div className="App">
			<CssBaseline />
			{props.loading ? 
				<div className="center">
					<Loader type="Circles" color="#00BFFF" height={200} width={200} /> 
				</div>
				: (props.user ? <Dashboard /> : <Auth />)}
				<Snackbar open={open} autoHideDuration={2500} onClose={handleError}>
					<Alert severity="error">
						{props.error}
					</Alert>
				</Snackbar>
		</div>
	);
}

export default AppComponent;
