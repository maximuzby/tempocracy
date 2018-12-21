import { createBrowserHistory } from 'history';
import { observer } from 'mobx-react';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import React from 'react';
import { Router } from 'react-router';
import { AppLayout } from './app-layout';
import { AppStateModel } from './app-state';
import { AppNavbar } from './navigation/app-navbar';
import { RecordList } from './record-list/record-list';

const browserHistory = createBrowserHistory();
const routingStore = new RouterStore();
const history = syncHistoryWithStore(browserHistory, routingStore);

interface Props {
	model: AppStateModel;
}

const NotFound = () => {
	return <h1>Not Found!</h1>;
};

const AppBody = observer((props: Props) => {
	return routingStore.location.pathname === '/' ? (
		<RecordList model={props.model.recordList} />
	) : (
		<NotFound />
	);
});

export const App = (props: Props) => (
	<Router history={history}>
		<AppLayout>
			{{
				header: <AppNavbar router={routingStore} />,
				body: <AppBody model={props.model} />,
			}}
		</AppLayout>
	</Router>
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
