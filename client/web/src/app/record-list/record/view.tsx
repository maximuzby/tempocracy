import { Button, TextField, WithStyles } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { observer } from 'mobx-react';
import * as React from 'react';
import { styles } from '../../styles';
import { RecordListModel } from '../model';
import { RecordModel } from './model';

const TEXTAREA_MAX_ROWS = 20;

interface Props extends WithStyles<typeof styles> {
	index: number;
	model: RecordModel;
	listModel: RecordListModel;
	onDelete: () => void;
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
				className={props.classes.textField}
				margin='normal'
			/>
			<DeleteForeverIcon
				className={props.classes.icon}
				onClick={props.onDelete}
			/>
		</div>
	);
});
