import { destroy, getSnapshot, onSnapshot } from 'mobx-state-tree';
import { connectReduxDevtools } from 'mst-middlewares';
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './app/app';
import {
	RecordListModel,
	recordListModel,
	RecordListSnapshot,
} from './app/record-list/model';
import './index.css';

const localStorageKey = 'tempocracy-dev';

const localStorageItem = localStorage.getItem(localStorageKey);

const initialState: RecordListSnapshot = localStorageItem
	? (JSON.parse(localStorageItem) as RecordListSnapshot)
	: {
			isLoading: false,
			records: [],
			newRecord: '',
			userToken: 'Max',
	  };

let model: RecordListModel;
let snapshotListener: (() => void) | undefined;

function createModel(snapshot: RecordListSnapshot) {
	if (snapshotListener) {
		snapshotListener();
	}
	// kill old model to prevent accidental use and run clean up hooks
	if (model) {
		destroy(model);
	}

	// create new one
	model = recordListModel.create(snapshot);

	// connect devtools
	connectReduxDevtools(require('remotedev'), model);
	// connect local storage
	snapshotListener = onSnapshot(model, (snapshotToSave: RecordListSnapshot) =>
		localStorage.setItem(localStorageKey, JSON.stringify(snapshotToSave)),
	);

	return model;
}

function renderApp(appModel: RecordListModel) {
	ReactDOM.render(<App model={appModel} />, document.getElementById('root'));
}

// Initial render
renderApp(createModel(initialState));

// Connect HMR
if (module.hot) {
	module.hot.accept(['./app/record-list/model'], () => {
		//  definition changed, recreate a new one from old state
		renderApp(createModel(getSnapshot(model)));
	});

	module.hot.accept(['./app/app'], () => {
		// Component definition changed, re-render app
		renderApp(model);
	});
}
