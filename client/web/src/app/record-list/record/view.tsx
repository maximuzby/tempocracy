import { TextField } from '@material-ui/core';
import { observer } from 'mobx-react';
import * as React from 'react';
import { RecordModel } from './model';

const TEXTAREA_MAX_ROWS = 20;

interface Props {
	index: number;
	classes: string;
	model: RecordModel;
}

export const RecordView = observer((props: Props) => {
	const model = props.model;

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		model.updateText(event.target.value);
	};

	const date = model.date();

	return (
		<div>
			<TextField
				id={`record-${model.id}`}
				label={model.isUpdating ? 'Updating...' : date}
				multiline={true}
				rowsMax={TEXTAREA_MAX_ROWS}
				value={model.text}
				onChange={handleChange}
				className={props.classes}
				margin='normal'
			/>
		</div>
	);
});
