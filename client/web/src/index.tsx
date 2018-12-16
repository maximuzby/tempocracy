import { destroy, getSnapshot, onSnapshot } from 'mobx-state-tree';
import { connectReduxDevtools } from 'mst-middlewares';
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './app/app';
import {
	AppState,
	AppStateModel,
	AppStateSnapshot,
	defaultState,
} from './app/app-state';

import 'normalize.css/normalize.css';

import './index.css';

const localStorageKey = 'tempocracy-dev';

const localStorageItem = localStorage.getItem(localStorageKey);

const initialState: AppStateSnapshot = localStorageItem
	? (JSON.parse(localStorageItem) as AppStateSnapshot)
	: defaultState();

let model: AppStateModel;
let snapshotListener: (() => void) | undefined;

function createModel(snapshot: AppStateSnapshot) {
	if (snapshotListener) {
		snapshotListener();
	}
	// kill old model to prevent accidental use and run clean up hooks
	if (model) {
		destroy(model);
	}

	model = AppState.create(snapshot);

	// connect devtools
	connectReduxDevtools(require('remotedev'), model);
	// connect local storage
	snapshotListener = onSnapshot(model, (snapshotToSave: AppStateSnapshot) =>
		localStorage.setItem(localStorageKey, JSON.stringify(snapshotToSave)),
	);

	return model;
}

function renderApp(appModel: AppStateModel) {
	ReactDOM.render(<App model={appModel} />, document.getElementById('root'));
}

// Initial render. Fallback to empty state.
try {
	renderApp(createModel(initialState));
} catch (err) {
	renderApp(createModel(defaultState()));
}

// Connect HMR
if (module.hot) {
	module.hot.accept(['./app/app-state'], () => {
		//  definition changed, recreate a new one from old state
		renderApp(createModel(getSnapshot(model)));
	});

	module.hot.accept(['./app/app'], () => {
		// Component definition changed, re-render app
		renderApp(model);
	});
}
