export interface ServerRecord {
	id: string;
	text: string;
	createdAt: string;
}

export interface GetRecordsResult {
	records: ServerRecord[];
}

export interface AddRecordArgs {
	text: string;
	userToken: string;
	finish: Date | undefined;
}

export interface UpdateRecordArgs extends AddRecordArgs {
	id: string;
}
