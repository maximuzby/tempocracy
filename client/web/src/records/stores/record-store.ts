import _ from 'lodash';
import { getParentOfType, types } from 'mobx-state-tree';
import { serverActions } from '../server/server-actions';
import { recordListStore } from './record-list-store';

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
