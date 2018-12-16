import _ from 'lodash';
import { getParentOfType, Instance, types } from 'mobx-state-tree';
import { recordApi } from '../../middleware/record-api';
import { RecordListModel } from '../record-list-model';

export const NEW_RECORD_ID = '0';

export const RecordModel = types
	.model('Record', {
		id: types.identifier,

		createdAt: types.optional(types.string, new Date().toLocaleString()),
		text: types.optional(types.string, ''),
		finishDate: types.maybe(types.Date),

		isUpdating: false,
	})
	.views((self) => ({
		isNew: () => self.id === NEW_RECORD_ID,
		userToken: () => getParentOfType(self, RecordListModel).userToken,
		date: () => new Date(self.createdAt).toLocaleString(),
		finishDateString: () =>
			self.finishDate ? self.finishDate.toLocaleString() : '',
	}))
	.actions((self) => ({
		setUpdatingState: (isUpdating: boolean) => {
			self.isUpdating = isUpdating;
		},
	}))
	.actions((self) => ({
		updateText: (text: string) => {
			self.text = text;
			if (self.isNew()) {
				recordApi.updateRecordDelayed(
					{
						id: self.id,
						text: self.text,
						userToken: self.userToken(),
						finish: self.finishDate,
					},
					self.setUpdatingState,
				);
			}
		},
		updateFinishDate: (dateTime: Date) => (self.finishDate = dateTime),
		clear: () => {
			self.text = '';
			self.finishDate = undefined;
		},
	}));

export interface RecordModel extends Instance<typeof RecordModel> {}
