import { Instance, SnapshotIn, types } from 'mobx-state-tree';
import { RouterModel } from 'mst-react-router';
import {
	RecordListModel,
	SomeServiceModel,
} from './record-list/record-list-model';
import { UserModel } from './user/user-model';

export const AppState = types
	.model({
		isLoading: true,
		currentUser: types.optional(UserModel, { token: '' }),
		recordList: RecordListModel,
		someService: SomeServiceModel,
		router: RouterModel,
	})
	.actions((self) => ({
		openRecords: () => {
			self.currentUser = UserModel.create({
				token: 'Max',
			});
		},
	}));

export interface AppStateModel extends Instance<typeof AppState> {}

export interface AppStateSnapshot extends SnapshotIn<typeof AppState> {}

export const defaultState = (): AppStateSnapshot => {
	return {
		isLoading: true,
		currentUser: {
			token: 'Max',
		},
		router: RouterModel.create(),
		recordList: {
			isLoading: true,
			records: [],
			userToken: 'Max',
		},
		someService: {},
	};
};
