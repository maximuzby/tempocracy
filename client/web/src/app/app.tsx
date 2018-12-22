import React from 'react';
import { AppLayout } from './app-layout';
import { AppStateModel } from './app-state';
import { AppBody } from './navigation/app-body';
import { AppNavbar } from './navigation/app-navbar';

interface Props {
	model: AppStateModel;
}

export const App = (props: Props) => (
	<AppLayout>
		{{
			header: <AppNavbar />,
			body: <AppBody model={props.model} />,
		}}
	</AppLayout>
);
