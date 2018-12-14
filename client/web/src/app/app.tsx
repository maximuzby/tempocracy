import { withStyles, WithStyles } from '@material-ui/core';
import React from 'react';
import { AppStateModel } from './app-state';
import { RecordList } from './record-list/view';
import { styles } from './styles';
import { withRoot } from './with-root';

interface Props extends WithStyles<typeof styles> {
	model: AppStateModel;
}

export const App = withRoot(
	withStyles(styles)((props: Props) => (
		<div>
			<RecordList
				model={props.model.recordList}
				classes={props.classes}
			/>
		</div>
	)),
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
