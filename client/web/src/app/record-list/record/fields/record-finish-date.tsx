import { Classes } from '@blueprintjs/core';
import { DatePicker, TimePrecision } from '@blueprintjs/datetime';
import { observer } from 'mobx-react';
import * as React from 'react';
import { RecordModel } from '../record-model';

interface Props {
	model: RecordModel;
}

export const RecordFinishDate = observer((props: Props) => {
	const model = props.model;

	const handleChange = (selectedDate: Date) => {
		model.updateFinishDate(selectedDate);
	};

	return (
		<DatePicker
			value={model.finishDate}
			className={Classes.ELEVATION_1}
			onChange={handleChange}
			timePrecision={TimePrecision.MINUTE}
			showActionsBar={true}
		/>
	);
});
