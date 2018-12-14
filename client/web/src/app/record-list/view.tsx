import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { WithStyles } from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import _ from 'lodash';
import { observer } from 'mobx-react';
import * as React from 'react';
import { match } from 'react-router';
import { styles } from '../styles';
import { RecordListModel } from './model';
import { RecordModel } from './record/model';
import { RecordView } from './record/view';

const TEXTAREA_MAX_ROWS = 20;

interface Props extends WithStyles<typeof styles> {
	match?: match<{ userToken: string }>;
	model: RecordListModel;
}

export const RecordList = observer((props: Props) => {
	const classes = props.classes;
	const model = props.model;
	const addRecord = () => {
		model.addRecord();
	};

	const deleteRecord = (record: RecordModel) => () => {
		model.deleteRecord(record);
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		model.setNewRecordText(event.target.value);
	};
	return (
		<div className={classes.root}>
			<Typography variant='h4' gutterBottom={true}>
				Records
			</Typography>
			<Typography variant='subtitle1' gutterBottom={true}>
				Path: {model.userToken}
			</Typography>
			<TextField
				id='new-record'
				label='Create a record'
				multiline={true}
				rowsMax={TEXTAREA_MAX_ROWS}
				value={model.newRecord}
				onChange={handleChange}
				className={classes.textField}
				margin='normal'
			/>
			{model.newRecord.length > 0 && (
				<Button
					variant='contained'
					color='primary'
					onClick={addRecord}
					className={classes.buttons}
				>
					Save
				</Button>
			)}
			{model.records.map((record: RecordModel, index: number) => (
				<RecordView
					key={record.id}
					index={index}
					classes={classes}
					model={record}
					listModel={model}
					onDelete={deleteRecord(record)}
				/>
			))}
		</div>
	);
});
