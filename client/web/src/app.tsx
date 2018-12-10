import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './app.css';
import { RecordList } from './records/components/record-list-view';
import { DefaultRedirect } from './records/default-redirect';
import { RecordListStore } from './records/stores/interfaces';

export const App = (props: { store: RecordListStore }) => (
	<div>
		<RecordList store={props.store} />
	</div>
);

export const AppWithRoutes = () => (
	<Router>
		<div>
			<Route path='/records/:userToken' component={RecordList} />
			<Route path='/' exact={true} component={DefaultRedirect} />
		</div>
	</Router>
);
