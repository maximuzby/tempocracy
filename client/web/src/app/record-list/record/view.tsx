import { TextField } from '@material-ui/core';
import { observer } from 'mobx-react';
import * as React from 'react';
import { RecordModel } from './model';

const TEXTAREA_MAX_ROWS = 20;

interface Props {
	index: number;
	classes: string;
	store: RecordModel;
}

export const RecordView = observer((props: Props) => {
	const store = props.store;

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		store.updateText(event.target.value);
	};

	const date = store.date();

	return (
		<div>
			<TextField
				id={`record-${store.id}`}
				label={store.isUpdating ? 'Updating...' : date}
				multiline={true}
				rowsMax={TEXTAREA_MAX_ROWS}
				value={store.text}
				onChange={handleChange}
				className={props.classes}
				margin='normal'
			/>
		</div>
	);
});
