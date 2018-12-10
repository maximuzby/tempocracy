import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import './app.css';
import { RecordList } from './records/record-list';
import { RedirectToRecords } from './records/redirect-to-records';

export const App = () => (
	<Router>
		<div>
			<Route path='/records/:userToken' component={RecordList} />
			<Route path='/' exact={true} component={RedirectToRecords} />
		</div>
	</Router>
);
