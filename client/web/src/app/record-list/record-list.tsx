import { Spinner } from '@blueprintjs/core';
import { observer } from 'mobx-react';
import * as React from 'react';
import { match } from 'react-router';
import { RecordListModel } from './record-list-model';
import { RecordAdd } from './record/add/record-add';
import { RecordEdit } from './record/edit/record-edit';
import { RecordFocus } from './record/record';
import { RecordModel } from './record/record-model';

export interface RecordListUrlProps {
	userToken: string;
}

interface Props {
	match?: match<RecordListUrlProps>;
	model: RecordListModel;
}

const getFocusState = (model: RecordListModel, record: RecordModel) => {
	return {
		onFocus: () => model.setFocus(record),
		isFocused: model.focusedRecord === record,
	};
};

const RenderRecordEdit = (model: RecordListModel, record: RecordModel) => {
	const onDelete = () => model.deleteRecord(record);
	const focus = getFocusState(model, record);
	return (
		<RecordEdit
			key={record.id}
			model={record}
			onDelete={onDelete}
			focus={focus}
		/>
	);
};

export const RecordList = observer((props: Props) => {
	const model = props.model;

	const addRecord = () => model.addRecord(model.newRecord);
	const newRecordFocus = getFocusState(model, model.newRecord);

	return model.isLoading ? (
		<Spinner />
	) : (
		<div>
			<h4>Records</h4>
			<h5>Path: {model.userToken}</h5>
			<RecordAdd
				model={model.newRecord}
				addRecord={addRecord}
				focus={newRecordFocus}
			/>
			{model.records.map((x) => RenderRecordEdit(model, x))}
		</div>
	);
});
