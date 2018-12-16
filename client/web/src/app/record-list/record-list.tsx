import { WithStyles } from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import _ from 'lodash';
import { observer } from 'mobx-react';
import * as React from 'react';
import { match } from 'react-router';
import { styles } from '../styles';
import { RecordAdd } from './record-edit/record-add';
import { RecordEdit } from './record-edit/record-edit';
import { RecordEditModel } from './record-edit/record-edit-model';
import { RecordListModel } from './record-list-model';

interface Props extends WithStyles<typeof styles> {
	match?: match<{ userToken: string }>;
	model: RecordListModel;
}

export const RecordList = observer((props: Props) => {
	const classes = props.classes;
	const model = props.model;

	const addRecord = () => model.addRecord(model.newRecord);

	return (
		<div className={classes.root}>
			<Typography variant='h4' gutterBottom={true}>
				Records
			</Typography>
			<Typography variant='subtitle1' gutterBottom={true}>
				Path: {model.userToken}
			</Typography>
			<RecordAdd
				classes={props.classes}
				model={model.newRecord}
				addRecord={addRecord}
			/>
			{model.records.map((record: RecordEditModel) => {
				const onDelete = () => model.deleteRecord(record);
				return (
					<RecordEdit
						key={record.id}
						classes={props.classes}
						model={record}
						onDelete={onDelete}
					/>
				);
			})}
		</div>
	);
});
