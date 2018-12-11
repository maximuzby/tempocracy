import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './app.css';
import { DefaultRedirect } from './record-list/default-redirect';
import { RecordListModel } from './record-list/model';
import { RecordList } from './record-list/view';

export const App = (props: { store: RecordListModel }) => (
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
