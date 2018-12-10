import axios from 'axios';
import _ from 'lodash';
import { IRecordModel } from '../interfaces';
import { IGetRecordsResult } from './server-interfaces';

const WAIT_BEFORE_UPDATE_MS = 500;
export const serverActions = {
	updateRecordDelayed: _.debounce(
		async (
			record: IRecordModel,
			userToken: string,
			setUpdatingState: (isUpdating: boolean) => void,
		) => {
			setUpdatingState(true);
			await axios.put<void>(`/api/record`, {
				userId: userToken,
				recordId: record.id,
				text: record.text,
			});
			setUpdatingState(false);
		},
		WAIT_BEFORE_UPDATE_MS,
	),
	getRecords: async (userToken: string) => {
		return (await axios.get<IGetRecordsResult>(
			`/api/record/list?userToken=${userToken}`,
		)).data.records;
	},
	addRecord: async (text: string, userToken: string) => {
		await axios.post<void>(`/api/record`, {
			userId: userToken,
			text,
		});
	},
};
