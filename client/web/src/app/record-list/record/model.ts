import _ from 'lodash';
import { getParentOfType, Instance, SnapshotOut, types } from 'mobx-state-tree';
import { RecordListModel } from '../model';
import { serverActions } from '../server/actions';

export const RecordModel = types
	.model('Record', {
		id: types.identifier,
		text: types.string,
		createdAt: types.string,
		isUpdating: false,
	})
	.views((self) => ({
		recordList: () => getParentOfType(self, RecordListModel),
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
	}));

export interface RecordModel extends Instance<typeof RecordModel> {}
export interface Record extends SnapshotOut<typeof RecordModel> {}
