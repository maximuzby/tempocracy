import axios from 'axios';
import _ from 'lodash';
import { GetRecordsResult, ServerRecord } from './interfaces';

const WAIT_BEFORE_UPDATE_MS = 500;
export const serverActions = {
	addRecord: async (text: string, userToken: string): Promise<void> => {
		await axios.post<void>(`/api/record`, {
			userId: userToken,
			text,
		});
	},
	// _.debounce is used in order to send update call only when user stopped typing.
	updateRecordDelayed: _.debounce(
		async (
			record: ServerRecord,
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
	getRecords: async (userToken: string): Promise<ServerRecord[]> => {
		return (await axios.get<GetRecordsResult>(
			`/api/record/list?userToken=${userToken}`,
		)).data.records;
	},
};
