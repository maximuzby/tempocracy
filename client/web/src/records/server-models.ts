export interface GetRecordsQuery {
	userToken: string;
	skip?: number;
	take?: number;
}

export interface Record {
	id: string;
	text: string;
	createdAt: string;
}

export interface GetRecordsResult {
	records: Record[];
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
