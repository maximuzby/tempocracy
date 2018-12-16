import { Button } from '@blueprintjs/core';
import { observer } from 'mobx-react';
import * as React from 'react';
import { Record, RecordFocus } from '../record';
import { RecordModel } from '../record-model';

interface Props {
	model: RecordModel;
	focus: RecordFocus;
	onDelete: () => void;
}

export const RecordEdit = observer((props: Props) => {
	const label = props.model.isUpdating ? 'Updating...' : props.model.date();

	return (
		<Record model={props.model} title={label} focus={props.focus}>
			{{
				actions: (
					<Button
						icon='trash'
						intent='danger'
						onClick={props.onDelete}
						text='Delete'
					/>
				),
			}}
		</Record>
	);
});
