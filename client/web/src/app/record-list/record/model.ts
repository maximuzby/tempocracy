import _ from 'lodash';
import { getParentOfType, Instance, types } from 'mobx-state-tree';
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
		list: () => getParentOfType(self, recordListModel),
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

export interface RecordModel extends Instance<typeof recordModel> {}
