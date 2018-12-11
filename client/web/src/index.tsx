import { destroy, getSnapshot, onSnapshot } from 'mobx-state-tree';
import { connectReduxDevtools } from 'mst-middlewares';
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './app/app';
import {
	RecordList,
	RecordListModel,
	recordListModel,
} from './app/record-list/model';
import './index.css';

const localStorageKey = 'tempocracy-dev';

const localStorageItem = localStorage.getItem(localStorageKey);

const initialState: RecordList = localStorageItem
	? (JSON.parse(localStorageItem) as RecordList)
	: {
			isLoading: false,
			records: [],
			newRecord: '',
			userToken: 'Max',
	  };

let model: RecordListModel;
let snapshotListener: (() => void) | undefined;

function createModel(snapshot: RecordList) {
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
	snapshotListener = onSnapshot(model, (snapshotToSave: RecordList) =>
		localStorage.setItem(localStorageKey, JSON.stringify(snapshotToSave)),
	);

	return model;
}

function renderApp(appModel: RecordListModel) {
	ReactDOM.render(<App model={appModel} />, document.getElementById('root'));
	appModel.updateRecordList();
}

// Initial render
renderApp(createModel(initialState));

// Connect HMR
if (module.hot) {
	module.hot.accept(['./app/records/record-list/model'], () => {
		// Model definition changed, recreate a new one from old state
		renderApp(createModel(getSnapshot(model)));
	});

	module.hot.accept(['./app'], () => {
		// Component definition changed, re-render app
		renderApp(model);
	});
}
