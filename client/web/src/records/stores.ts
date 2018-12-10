import _ from 'lodash';
import { flow, getParentOfType, types } from 'mobx-state-tree';
import { serverActions } from './server/server-actions';

export const recordStore = types
	.model('Record', {
		id: types.identifier,
		text: types.string,
		createdAt: types.string,
		isUpdating: false,
	})
	.views((self) => ({
		list: () => getParentOfType(self, recordListStore),
	}))
	.actions((self) => ({
		setUpdatingState: (isUpdating: boolean) => {
			self.isUpdating = isUpdating;
		},
	}))
	.actions((self) => ({
		updateText: (text: string) => {
			self.text = text;
			serverActions.updateRecordDelayed(
				self,
				self.list().userToken,
				self.setUpdatingState,
			);
		},
	}));

const recordListStore = types
	.model('RecordList', {
		isLoading: true,
		records: types.array(recordStore),
		newRecord: types.string,
		userToken: types.string,
	})
	.actions((self) => ({
		markLoaded: () => {
			self.isLoading = false;
		},
		updateRecordList: flow(function*() {
			self.isLoading = true;
			self.records = yield serverActions.getRecords(self.userToken);
			self.isLoading = false;
		}),
		addRecord: flow(function*() {
			self.isLoading = true;
			yield serverActions.addRecord(self.newRecord, self.userToken);
		}),
	}));
