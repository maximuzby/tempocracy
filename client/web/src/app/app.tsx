import { observer } from 'mobx-react';
import React from 'react';
import { AppLayout } from './app-layout';
import { AppStateModel } from './app-state';
import { AppNavbar } from './navigation/app-navbar';
import { RecordList } from './record-list/record-list';

interface Props {
	model: AppStateModel;
}

export const App = observer((props: Props) => (
	<AppLayout>
		{{
			header: <AppNavbar />,
			body: <RecordList model={props.model.recordList} />,
		}}
	</AppLayout>
));

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
