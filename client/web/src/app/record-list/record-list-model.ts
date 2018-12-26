import _ from 'lodash';
import { flow, Instance, types } from 'mobx-state-tree';
import { recordApi } from '../middleware/record-api';
import { NEW_RECORD_ID, RecordModel } from './record/record-model';

export const SomeServiceModel = types
	.model('SomeService', { isBlue: false })
	.actions((self) => ({
		sayHello: () => alert('hello!'),
	}));

export interface SomeServiceModel extends Instance<typeof SomeServiceModel> {}

export const RecordListModel = types
	.model('RecordList', {
		isLoading: true,
		records: types.array(RecordModel),
		newRecord: types.optional(RecordModel, { id: NEW_RECORD_ID }),
		userToken: types.string,
		focusedRecord: types.maybe(types.safeReference(RecordModel)),
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
			self.newRecord.clear();
			self.isLoading = false;
		}),
		deleteRecord: flow(function*(record: RecordModel) {
			if (record) {
				yield recordApi.deleteRecord(record.id, self.userToken);
				self.records.remove(record);
			}
		}),
		setUserToken: (userToken: string) => {
			self.userToken = userToken;
		},
		setFocus: (record: RecordModel | undefined) => {
			self.focusedRecord = record;
		},
	}));

export interface RecordListModel extends Instance<typeof RecordListModel> {}
