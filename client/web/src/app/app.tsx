import { observer } from 'mobx-react';
import React from 'react';
import {
	BrowserRouter,
	Route,
	RouteComponentProps,
	Switch,
} from 'react-router-dom';
import { AppLayout } from './app-layout';
import { AppStateModel } from './app-state';
import { AppNavbar } from './navigation/app-navbar';
import { RecordList, RecordListUrlProps } from './record-list/record-list';

interface Props {
	model: AppStateModel;
}

const NotFound = () => {
	return <h1>Not Found!</h1>;
};

const AppBody = (props: Props) => {
	const renderRecordList = (
		routeProps: RouteComponentProps<RecordListUrlProps>,
	) => {
		return <RecordList model={props.model.recordList} {...routeProps} />;
	};

	return (
		<Switch>
			<Route path='/' exact={true} render={renderRecordList} />
			<Route component={NotFound} />
		</Switch>
	);
};

export const App = (props: Props) => (
	<BrowserRouter>
		<AppLayout>
			{{
				header: <AppNavbar />,
				body: <AppBody model={props.model} />,
			}}
		</AppLayout>
	</BrowserRouter>
);

// For now it is not used
// export const AppWithRoutes = () => (
// 	<Router>
// 		<div>
// 			<Route path='/records/:userToken' component={RecordList} />
// 			<Route
// 				path={routes.root}
// 				exact={true}
// 				component={DefaultRedirect}
// 			/>
// 		</div>
// 	</Router>
// );
