import { Button } from '@blueprintjs/core';
import { observer } from 'mobx-react';
import * as React from 'react';
import { Record, RecordFocus } from '../record';
import { RecordModel } from '../record-model';

interface Props {
	model: RecordModel;
	addRecord: () => void;
	focus: RecordFocus;
}

export const RecordAdd = observer((props: Props) => (
	<Record focus={props.focus} title='Create a record' model={props.model}>
		{{
			actions: props.model.text.length > 0 && (
				<Button
					icon='add'
					intent='success'
					onClick={props.addRecord}
					text='Save'
				/>
			),
		}}
	</Record>
));
