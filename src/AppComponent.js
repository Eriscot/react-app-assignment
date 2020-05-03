import React from 'react';
import './App.css';
import Dashboard from './Dashboard/Dashboard';
import Auth from './Auth/Auth';
import Loader from 'react-loader-spinner';
import { CssBaseline } from '@material-ui/core';

function AppComponent(props) {
	return (
		<div className="App">
			<CssBaseline />
			{props.loading ? 
				<div className="center">
					<Loader type="Circles" color="#00BFFF" height={200} width={200} /> 
				</div>
				: (props.user ? <Dashboard /> : <Auth />)}
		</div>
	);
}

export default AppComponent;
