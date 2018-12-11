import _ from 'lodash';
import { getParentOfType, Instance, SnapshotOut, types } from 'mobx-state-tree';
import { recordListStore } from '../record-list/model';
import { serverActions } from '../server/actions';

export const recordStore = types
	.model('Record', {
		id: types.identifier,
		text: types.string,
		createdAt: types.string,
		isUpdating: false,
	})
	.views((self) => ({
		list: () => getParentOfType(self, recordListStore),
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
				self.list().userToken,
				self.setUpdatingState,
			);
		},
	}));

export interface RecordStore extends Instance<typeof recordStore> {}

export interface Record extends SnapshotOut<typeof recordStore> {}
