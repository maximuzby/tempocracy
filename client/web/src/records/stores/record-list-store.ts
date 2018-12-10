import _ from 'lodash';
import { flow, types } from 'mobx-state-tree';
import { serverActions } from '../server/server-actions';
import { recordStore } from './record-store';

export const recordListStore = types
	.model('RecordList', {
		isLoading: true,
		records: types.array(recordStore),
		newRecord: types.string,
		userToken: types.string,
	})
	.actions((self) => ({
		updateRecordList: flow(function*() {
			self.isLoading = true;
			self.records = yield serverActions.getRecords(self.userToken);
			self.isLoading = false;
		}),
		addRecord: flow(function*() {
			self.isLoading = true;
			yield serverActions.addRecord(self.newRecord, self.userToken);
			self.records = yield serverActions.getRecords(self.userToken);
			self.newRecord = '';
			self.isLoading = false;
		}),
		setUserToken: (userToken: string) => {
			self.userToken = userToken;
		},
		setNewRecordText: (text: string) => {
			self.newRecord = text;
		},
	}));
