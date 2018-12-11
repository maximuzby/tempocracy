import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './app';
import { recordListStore } from './record-list/model';

it('renders without crashing', () => {
	const div = document.createElement('div');
	const store = recordListStore.create({
		isLoading: false,
		records: [],
		newRecord: '',
		userToken: 'Max',
	});
	ReactDOM.render(<App store={store} />, div);
	ReactDOM.unmountComponentAtNode(div);
});
