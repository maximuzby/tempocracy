import { destroy, getSnapshot, onSnapshot } from 'mobx-state-tree';
import { connectReduxDevtools } from 'mst-middlewares';
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './app';
import './index.css';
import { RecordList, RecordListStore } from './records/stores/interfaces';
import { recordListStore } from './records/stores/record-list-store';

const localStorageKey = 'tempocracy-dev';

const localStorageItem = localStorage.getItem(localStorageKey);

const initialState: RecordList = localStorageItem
	? (JSON.parse(localStorageItem) as RecordList)
	: {
			isLoading: false,
			records: [],
			newRecord: '',
			userToken: '',
	  };

let store: RecordListStore;
let snapshotListener: (() => void) | undefined;

function createStore(snapshot: RecordList) {
	if (snapshotListener) {
		snapshotListener();
	}
	// kill old store to prevent accidental use and run clean up hooks
	if (store) {
		destroy(store);
	}

	// create new one
	store = recordListStore.create(snapshot);

	// connect devtools
	connectReduxDevtools(require('remotedev'), store);
	// connect local storage
	snapshotListener = onSnapshot(store, (snapshotToSave: RecordList) =>
		localStorage.setItem(localStorageKey, JSON.stringify(snapshotToSave)),
	);

	return store;
}

function renderApp(appStore: RecordListStore) {
	ReactDOM.render(<App store={appStore} />, document.getElementById('root'));
	appStore.updateRecordList();
}

// Initial render
renderApp(createStore(initialState));

// Connect HMR
if (module.hot) {
	module.hot.accept(['./records/stores/record-list-store'], () => {
		// Store definition changed, recreate a new one from old state
		renderApp(createStore(getSnapshot(store)));
	});

	module.hot.accept(['./app'], () => {
		// Componenent definition changed, re-render app
		renderApp(store);
	});
}
