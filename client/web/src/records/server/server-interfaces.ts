export interface IGetRecordsQuery {
	userToken: string;
	skip?: number;
	take?: number;
}

export interface IServerRecord {
	id: string;
	text: string;
	createdAt: string;
}

export interface IGetRecordsResult {
	records: IServerRecord[];
}

export interface IUpdateRecordCommand {
	userId: string;
	recordId: string;
	text: string;
}

export interface ICreateRecordCommand {
	userId: string;
	text: string;
}
