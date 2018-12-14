import { Instance, SnapshotOut, types } from 'mobx-state-tree';
import { RecordListModel, RecordListSnapshot } from './record-list/model';
import { UserModel } from './user/user-model';

export const AppState = types
	.model({
		isLoading: true,
		currentUser: types.optional(UserModel, { token: '' }),
		recordList: RecordListModel,
	})
	.actions((self) => ({
		afterCreate: () => {
			self.currentUser = UserModel.create({
				token: 'Max',
			});
		},
	}));

export interface AppStateModel extends Instance<typeof AppState> {}

export interface AppStateSnapshot extends SnapshotOut<typeof AppState> {}

export const defaultState = (): AppStateSnapshot => {
	return {
		isLoading: true,
		currentUser: {
			token: 'Max',
		},
		recordList: {
			isLoading: true,
			records: [],
			newRecord: '',
			userToken: 'Max',
		},
	};
};
