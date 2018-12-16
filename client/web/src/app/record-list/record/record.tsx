import { Card, Text } from '@blueprintjs/core';
import * as React from 'react';
import { RecordText } from './fields/record-text';
import { RecordModel } from './record-model';
import './record.css';

export interface RecordFocus {
	onFocus: () => void;
	isFocused: boolean;
}

interface Props {
	model: RecordModel;
	title: string;
	focus: RecordFocus;
	children?: { actions: React.ReactNode };
}

const FOCUS_ELEVATION = 4;
const NO_FOCUS_ELEVATION = 0;

const RecordRead = (props: Props) => {
	return (
		<Card
			className='tc-record'
			elevation={NO_FOCUS_ELEVATION}
			interactive={true}
			onClick={props.focus.onFocus}
		>
			<Text ellipsize={true}>
				<b>{props.title}</b>
			</Text>
			<Text>{props.model.text}</Text>
		</Card>
	);
};

const RecordEdit = (props: Props) => {
	return (
		<Card
			className='tc-record'
			elevation={FOCUS_ELEVATION}
			interactive={false}
		>
			<Text ellipsize={true}>
				<b>{props.title}</b>
			</Text>
			<RecordText
				label={props.title}
				model={props.model}
				isEditMode={true}
			/>
			{props.children && props.children.actions}
		</Card>
	);
};

export const Record = (props: Props) => {
	return props.focus.isFocused ? RecordEdit(props) : RecordRead(props);
};
