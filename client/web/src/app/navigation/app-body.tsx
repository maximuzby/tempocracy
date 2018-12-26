import { observer, Provider } from 'mobx-react';
import * as React from 'react';
import {
	Route,
	RouteComponentProps,
	Switch,
	withRouter,
} from 'react-router-dom';
import { AppStateModel } from '../app-state';
import { RecordList } from '../record-list/record-list';

interface Props extends RouteComponentProps {
	model: AppStateModel;
}

const NotFound = () => {
	return <h1>Not Found!</h1>;
};

const renderRecordList = (model: AppStateModel) => () => {
	model.recordList.updateRecordList();
	return <RecordList recordList={model.recordList} />;
};

export const AppBody = withRouter(
	observer((props: Props) => {
		return (
			<Provider recordList={props.model.recordList}>
				<Switch>
					<Route
						path='/records'
						render={renderRecordList(props.model)}
					/>
					<Route component={NotFound} />
				</Switch>
			</Provider>
		);
	}),
);
