import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import _ from 'lodash';
import * as React from 'react';
import { match } from 'react-router';
import { withRoot } from '../with-root';
import { GetRecordsResult, Record, UpdateRecordCommand } from './server-models';

const PADDING_MULTIPLIER = 20;
const TEXTAREA_MAX_ROWS = 20;

const styles = (theme: Theme) =>
	createStyles({
		root: {
			textAlign: 'center',
			paddingTop: theme.spacing.unit * PADDING_MULTIPLIER,
		},
		textField: {
			marginLeft: theme.spacing.unit,
			marginRight: theme.spacing.unit,
			width: 500,
		},
		buttons: {
			margin: theme.spacing.unit,
			position: 'absolute',
		},
	});

interface RecordState extends Record {
	isUpdating?: boolean;
}

type State = {
	open: boolean;
	userToken: string;
	records: RecordState[];
	newRecord: string;
};

interface RecordViewProps {
	record: RecordState;
	userToken: string;
	index: number;
	classes: string;
	onUpdate: (record: Partial<RecordState>) => void;
}

interface Props {
	userToken: string;
	match: match<{ userToken: string }>;
}

const WAIT_BEFORE_UPDATE_MS = 500;
const updateRecordOnServer = _.debounce(
	async (
		record: RecordState,
		userToken: string,
		onUpdate: (record: Partial<RecordState>) => void,
	) => {
		await axios.put<void>(`/api/record`, {
			userId: userToken,
			recordId: record.id,
			text: record.text,
		});
		onUpdate({ id: record.id, isUpdating: false });
	},
	WAIT_BEFORE_UPDATE_MS,
);

const RecordView = (props: RecordViewProps) => {
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const record: RecordState = {
			...props.record,
			text: event.target.value,
			isUpdating: true,
		};
		props.onUpdate(record);
		updateRecordOnServer(record, props.userToken, props.onUpdate);
	};

	const date = new Date(props.record.createdAt).toLocaleString();

	return (
		<div>
			<TextField
				id={`record-${props.record.id}`}
				label={props.record.isUpdating ? 'Updating...' : date}
				multiline={true}
				rowsMax={TEXTAREA_MAX_ROWS}
				value={props.record.text}
				onChange={handleChange}
				className={props.classes}
				margin='normal'
			/>
		</div>
	);
};

class RecordListView extends React.Component<
	WithStyles<typeof styles> & Props,
	State
> {
	public state: State = {
		open: false,
		userToken: this.props.match.params.userToken,
		records: [],
		newRecord: '',
	};

	public componentDidMount = async () => {
		await this.updateRecordList();
	};

	public render(): JSX.Element {
		const classes = this.props.classes;
		return (
			<div className={classes.root}>
				<Typography variant='h4' gutterBottom={true}>
					Records
				</Typography>
				<Typography variant='subtitle1' gutterBottom={true}>
					Path: {this.state.userToken}
				</Typography>
				<TextField
					id='new-record'
					label='Create a record'
					multiline={true}
					rowsMax={TEXTAREA_MAX_ROWS}
					value={this.state.newRecord}
					onChange={this.handleChange}
					className={classes.textField}
					margin='normal'
				/>
				{this.state.newRecord.length > 0 && (
					<Button
						variant='contained'
						color='primary'
						onClick={this.addRecord}
						className={classes.buttons}
					>
						Save
					</Button>
				)}
				{this.state.records.map(
					(record: RecordState, index: number) => (
						<RecordView
							key={record.id}
							record={record}
							index={index}
							classes={classes.textField}
							onUpdate={this.updateRecord}
							userToken={this.state.userToken}
						/>
					),
				)}
			</div>
		);
	}

	private updateRecordList = async () => {
		const response = (await axios.get<GetRecordsResult>(
			`/api/record/list?userToken=${this.state.userToken}`,
		)).data;
		this.setState({
			records: response.records,
		});
	};

	private updateRecord = (record: Partial<RecordState>) => {
		const mapFunc = (oldRecord: RecordState): RecordState => {
			if (oldRecord.id !== record.id) {
				return oldRecord;
			}

			return {
				...oldRecord,
				...record,
			};
		};

		this.setState({
			records: this.state.records.map(mapFunc),
		});
	};

	private addRecord = () => {
		axios
			.post<void>(`/api/record`, {
				userId: this.state.userToken,
				text: this.state.newRecord,
			})
			.then(this.updateRecordList);
		this.setState({ newRecord: '' });
	};

	private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({
			newRecord: event.target.value,
		});
	};
}

export const RecordList = withRoot(withStyles(styles)(RecordListView));
