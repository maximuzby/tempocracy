import { EditableText } from '@blueprintjs/core';
import { observer } from 'mobx-react';
import * as React from 'react';
import { RecordModel } from '../record-model';

interface Props {
	model: RecordModel;
	label: string;
	isEditMode: boolean;
}

const MIN_LINES = 3;
const MAX_LINES = 20;

export const RecordText = observer((props: Props) => {
	const model = props.model;

	const handleChange = (value: string) => {
		model.updateText(value);
	};

	return (
		<EditableText
			multiline={true}
			minLines={MIN_LINES}
			maxLines={MAX_LINES}
			placeholder='Type text here'
			value={model.text}
			onChange={handleChange}
			isEditing={props.isEditMode}
			disabled={!props.isEditMode}
		/>
	);
});
