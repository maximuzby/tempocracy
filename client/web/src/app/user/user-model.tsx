import { Instance, types } from 'mobx-state-tree';

export const UserModel = types.model('Account', {
	token: types.string,
});

export interface UserModel extends Instance<typeof UserModel> {}
