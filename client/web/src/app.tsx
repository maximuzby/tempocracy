import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import './app.css';
import { DefaultRedirect } from './records/default-redirect';
import { RecordList } from './records/views';

export const App = () => (
	<Router>
		<div>
			<Route path='/records/:userToken' component={RecordList} />
			<Route path='/' exact={true} component={DefaultRedirect} />
		</div>
	</Router>
);
