import { observer } from 'mobx-react';
import React, { ReactNode } from 'react';

interface Props {
	children: { header: ReactNode; body: ReactNode };
}

export const AppLayout = observer((props: Props) => {
	return (
		<div>
			{props.children.header}
			<div className='tc-app-container'>{props.children.body}</div>
		</div>
	);
});
