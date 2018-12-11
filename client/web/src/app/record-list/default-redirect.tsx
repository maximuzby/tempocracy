import * as React from 'react';
import { Redirect } from 'react-router-dom';

const getMagicString = () =>
	Math.random()
		// tslint:disable-next-line:no-magic-numbers
		.toString(36)
		// tslint:disable-next-line:no-magic-numbers
		.substring(2, 15);

export const DefaultRedirect = () => {
	const pathFromLocalStorage = localStorage.getItem('userToken');
	const redirectTo = pathFromLocalStorage || getMagicString();
	localStorage.setItem('userToken', redirectTo);
	return <Redirect to={`/records/${redirectTo}`} />;
};
