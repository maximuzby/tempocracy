import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './app';
import { AppState, defaultState } from './app-state';

it('renders without crashing', () => {
	const div = document.createElement('div');
	const model = AppState.create(defaultState());
	ReactDOM.render(<App model={model} />, div);
	ReactDOM.unmountComponentAtNode(div);
});
