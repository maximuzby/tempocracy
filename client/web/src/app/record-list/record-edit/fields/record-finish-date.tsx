import { TextField, WithStyles } from '@material-ui/core';
import { observer } from 'mobx-react';
import * as React from 'react';
import { styles } from '../../../styles';
import { RecordModel } from '../record-model';

const TEXTAREA_MAX_ROWS = 20;

interface Props extends WithStyles<typeof styles> {
	model: RecordModel;
}

export const RecordFinishDate = observer((props: Props) => {
	const model = props.model;

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const dateInString = event.target.value;
		const date = new Date(dateInString);
		model.updateFinishDate(date);
	};

	return (
		<TextField
			id={`record-${model.id}-date`}
			label='Finish until'
			type='datetime-local'
			value={model.finishDateString()}
			onBlur={handleChange}
			className={props.classes.textField}
			margin='normal'
			InputLabelProps={{
				shrink: true,
			}}
		/>
	);
});
