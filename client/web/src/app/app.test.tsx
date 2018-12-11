import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './app';
import { recordListModel } from './record-list/model';

it('renders without crashing', () => {
	const div = document.createElement('div');
	const model = recordListModel.create({
		isLoading: false,
		records: [],
		newRecord: '',
		userToken: 'Max',
	});
	ReactDOM.render(<App model={model} />, div);
	ReactDOM.unmountComponentAtNode(div);
});
