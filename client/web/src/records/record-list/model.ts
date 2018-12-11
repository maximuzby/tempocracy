import _ from 'lodash';
import { flow, Instance, SnapshotOut, types } from 'mobx-state-tree';
import { recordStore } from '../record/model';
import { serverActions } from '../server/actions';

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

export interface RecordListStore extends Instance<typeof recordListStore> {}

export interface RecordList extends SnapshotOut<typeof recordListStore> {}
