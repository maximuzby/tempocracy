import { observer } from 'mobx-react';
import { RouterView } from 'mobx-state-router';
import * as React from 'react';
import { AppStateModel } from '../app-state';
import { RecordList } from '../record-list/record-list';
import { router } from './router';

interface Props {
	model: AppStateModel;
}

const NotFound = () => {
	return <h1>Not Found!</h1>;
};

export const AppBody = observer((props: Props) => {
	const viewMap = {
		home: <RecordList model={props.model.recordList} />,
		notFound: <NotFound />,
	};

	return <RouterView routerStore={router} viewMap={viewMap} />;
});
