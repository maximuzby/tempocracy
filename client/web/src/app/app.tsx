import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './app.css';
import { DefaultRedirect } from './record-list/default-redirect';
import { RecordListModel } from './record-list/model';
import { RecordList } from './record-list/view';

interface Props {
	model: RecordListModel;
}

export const App = (props: Props) => (
	<div>
		<RecordList model={props.model} />
	</div>
);

// For now it is not used
export const AppWithRoutes = () => (
	<Router>
		<div>
			<Route path='/records/:userToken' component={RecordList} />
			<Route path='/' exact={true} component={DefaultRedirect} />
		</div>
	</Router>
);
