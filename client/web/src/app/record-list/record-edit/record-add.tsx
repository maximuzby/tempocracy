import { Button, WithStyles } from '@material-ui/core';
import { observer } from 'mobx-react';
import * as React from 'react';
import { styles } from '../../styles';
import { RecordFinishDate } from './fields/record-finish-date';
import { RecordText } from './fields/record-text';
import { RecordModel } from './record-model';

interface Props extends WithStyles<typeof styles> {
	model: RecordModel;
	addRecord: () => void;
}

export const RecordAdd = observer((props: Props) => {
	const model = props.model;
	const classes = props.classes;

	return (
		<div>
			<div>
				<RecordText
					label='Create a record'
					model={model}
					classes={classes}
				/>
				{model.text.length > 0 && (
					<Button
						variant='contained'
						color='primary'
						onClick={props.addRecord}
						className={classes.buttons}
					>
						Save
					</Button>
				)}
			</div>
			<div>
				<RecordFinishDate model={props.model} classes={props.classes} />
			</div>
		</div>
	);
});
