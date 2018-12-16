import _ from 'lodash';
import { Instance, types } from 'mobx-state-tree';

export const RecordModel = types
	.model('Record', {
		id: types.optional(types.identifier, 'new'),
		text: '',
		finishDate: types.maybe(types.Date),
	})
	.views((self) => ({
		finishDateString: () =>
			self.finishDate ? self.finishDate.toLocaleString() : '',
	}))
	.actions((self) => ({
		updateText: (text: string) => (self.text = text),
		updateFinishDate: (dateTime: Date) => (self.finishDate = dateTime),
	}));

export interface RecordModel extends Instance<typeof RecordModel> {}
