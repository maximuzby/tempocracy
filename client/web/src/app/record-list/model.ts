import _ from 'lodash';
import { flow, Instance, SnapshotOut, types } from 'mobx-state-tree';
import { RecordModel } from './record/model';
import { serverActions } from './server/actions';

export const RecordListModel = types
	.model('RecordList', {
		isLoading: true,
		records: types.array(RecordModel),
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
		deleteRecord: flow(function*(record: RecordModel) {
			if (record) {
				yield serverActions.deleteRecord(record.id, self.userToken);
				self.records.remove(record);
			}
		}),
		setUserToken: (userToken: string) => {
			self.userToken = userToken;
		},
		setNewRecordText: (text: string) => {
			self.newRecord = text;
		},
	}))
	.actions((self) => ({
		// Function is called when this store is created
		afterCreate: () => {
			self.updateRecordList();
		},
	}));

export interface RecordListModel extends Instance<typeof RecordListModel> {}

export interface RecordListSnapshot
	extends SnapshotOut<typeof RecordListModel> {}
