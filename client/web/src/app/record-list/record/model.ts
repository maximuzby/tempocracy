import _ from 'lodash';
import { getParentOfType, Instance, SnapshotOut, types } from 'mobx-state-tree';
import { recordListModel } from '../model';
import { serverActions } from '../server/actions';

export const recordModel = types
	.model('Record', {
		id: types.identifier,
		text: types.string,
		createdAt: types.string,
		isUpdating: false,
	})
	.views((self) => ({
		recordList: () => getParentOfType(self, recordListModel),
		date: () => new Date(self.createdAt).toLocaleString(),
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
				self.recordList().userToken,
				self.setUpdatingState,
			);
		},
		deleteRecord: () => {
			self.recordList().deleteRecord(self.id);
		},
	}));

export interface RecordModel extends Instance<typeof recordModel> {}
export interface Record extends SnapshotOut<typeof recordModel> {}
