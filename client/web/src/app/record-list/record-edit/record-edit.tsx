import { WithStyles } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { observer } from 'mobx-react';
import * as React from 'react';
import { styles } from '../../styles';
import { RecordFinishDate } from './fields/record-finish-date';
import { RecordText } from './fields/record-text';
import { RecordEditModel } from './record-edit-model';

interface Props extends WithStyles<typeof styles> {
	model: RecordEditModel;
	onDelete: () => void;
}

export const RecordEdit = observer((props: Props) => {
	const label = props.model.isUpdating ? 'Updating...' : props.model.date();

	return (
		<div>
			<div>
				<RecordText
					label={label}
					model={props.model}
					classes={props.classes}
				/>
				<DeleteForeverIcon
					className={props.classes.icon}
					onClick={props.onDelete}
				/>
			</div>
			<div>
				<RecordFinishDate model={props.model} classes={props.classes} />
			</div>
		</div>
	);
});
