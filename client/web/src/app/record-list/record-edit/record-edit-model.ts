import _ from 'lodash';
import { getParentOfType, Instance, types } from 'mobx-state-tree';
import { recordApi } from '../../middleware/record-api';
import { RecordListModel } from '../record-list-model';
import { RecordModel } from './record-model';

export const RecordEditModel = RecordModel.named('RecordEdit')
	.props({
		id: types.identifier,
		createdAt: types.string,
		isUpdating: false,
	})
	.views((self) => ({
		userToken: () => getParentOfType(self, RecordListModel).userToken,
		date: () => new Date(self.createdAt).toLocaleString(),
	}))
	.actions((self) => ({
		setUpdatingState: (isUpdating: boolean) => {
			self.isUpdating = isUpdating;
		},
	}))
	.actions((self) => {
		const base = {
			updateText: self.updateText,
		};
		return {
			updateText: (text: string) => {
				base.updateText(text);
				recordApi.updateRecordDelayed(
					{
						id: self.id,
						text: self.text,
						userToken: self.userToken(),
						finish: self.finishDate,
					},
					self.setUpdatingState,
				);
			},
		};
	});

export interface RecordEditModel extends Instance<typeof RecordEditModel> {}
