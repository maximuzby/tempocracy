export interface GetRecordsQuery {
	userToken: string;
	skip?: number;
	take?: number;
}

export interface ServerRecord {
	id: string;
	text: string;
	createdAt: string;
}

export interface GetRecordsResult {
	records: ServerRecord[];
}

export interface UpdateRecordCommand {
	userId: string;
	recordId: string;
	text: string;
}

export interface CreateRecordCommand {
	userId: string;
	text: string;
}
