import _ from 'lodash';
import { flow, Instance, types } from 'mobx-state-tree';
import { recordApi } from '../middleware/record-api';
import { RecordEditModel } from './record-edit/record-edit-model';
import { RecordModel } from './record-edit/record-model';

export const RecordListModel = types
	.model('RecordList', {
		isLoading: true,
		records: types.array(RecordEditModel),
		newRecord: types.optional(RecordModel, { text: '' }),
		userToken: types.string,
	})
	.actions((self) => ({
		updateRecordList: flow(function*() {
			self.isLoading = true;
			self.records = yield recordApi.getRecords(self.userToken);
			self.isLoading = false;
		}),
		addRecord: flow(function*(record: RecordModel) {
			self.isLoading = true;
			yield recordApi.addRecord({
				text: record.text,
				finish: record.finishDate,
				userToken: self.userToken,
			});
			self.records = yield recordApi.getRecords(self.userToken);
			self.newRecord = RecordModel.create({ text: '' });
			self.isLoading = false;
		}),
		deleteRecord: flow(function*(record: RecordEditModel) {
			if (record) {
				yield recordApi.deleteRecord(record.id, self.userToken);
				self.records.remove(record);
			}
		}),
		setUserToken: (userToken: string) => {
			self.userToken = userToken;
		},
	}))
	.actions((self) => ({
		// Function is called when this model is created
		afterCreate: () => {
			self.updateRecordList();
		},
	}));

export interface RecordListModel extends Instance<typeof RecordListModel> {}
