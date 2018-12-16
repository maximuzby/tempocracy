import { TextField, WithStyles } from '@material-ui/core';
import { observer } from 'mobx-react';
import * as React from 'react';
import { styles } from '../../../styles';
import { RecordModel } from '../record-model';

const TEXTAREA_MAX_ROWS = 20;

interface Props extends WithStyles<typeof styles> {
	model: RecordModel;
	label: string;
}

export const RecordText = observer((props: Props) => {
	const model = props.model;

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		model.updateText(event.target.value);
	};

	return (
		<TextField
			id={`record-${model.id}`}
			label={props.label}
			multiline={true}
			rowsMax={TEXTAREA_MAX_ROWS}
			value={model.text}
			onChange={handleChange}
			className={props.classes.textField}
			margin='normal'
		/>
	);
});
