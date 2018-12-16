import axios from 'axios';
import _ from 'lodash';
import {
	AddRecordArgs,
	GetRecordsResult,
	ServerRecord,
	UpdateRecordArgs,
} from './interfaces';

const RECORD_ROUTE = '/api/record';
const WAIT_BEFORE_UPDATE_MS = 500;

const mapRecordArgs = (args: AddRecordArgs) => ({
	userId: args.userToken,
	text: args.text,
	finish: args.finish,
});

export const recordApi = {
	addRecord: async (args: AddRecordArgs): Promise<void> => {
		await axios.post<void>(`/api/record`, mapRecordArgs(args));
	},
	// _.debounce is used in order to send update call only when user stopped typing.
	updateRecordDelayed: _.debounce(
		async (
			args: UpdateRecordArgs,
			setUpdatingState: (isUpdating: boolean) => void,
		) => {
			setUpdatingState(true);
			await axios.put<void>(RECORD_ROUTE, {
				...mapRecordArgs(args),
				recordId: args.id,
			});
			setUpdatingState(false);
		},
		WAIT_BEFORE_UPDATE_MS,
	),
	getRecords: async (userToken: string): Promise<ServerRecord[]> => {
		return (await axios.get<GetRecordsResult>(
			`${RECORD_ROUTE}/list?userToken=${userToken}`,
		)).data.records;
	},
	deleteRecord: async (
		recordId: string,
		userToken: string,
	): Promise<void> => {
		await axios.delete(RECORD_ROUTE, {
			data: {
				userId: userToken,
				recordId,
			},
		});
	},
};
