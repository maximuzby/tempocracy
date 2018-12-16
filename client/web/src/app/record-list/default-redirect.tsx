import * as React from 'react';
import { Redirect } from 'react-router-dom';

const RADIX = 36;
const SUBSTRING_START = 2;
const SUBSTRING_END = 15;

const getMagicString = () =>
	Math.random()
		.toString(RADIX)
		.substring(SUBSTRING_START, SUBSTRING_END);

export const DefaultRedirect = () => {
	const pathFromLocalStorage = localStorage.getItem('userToken');
	const redirectTo = pathFromLocalStorage || getMagicString();
	localStorage.setItem('userToken', redirectTo);
	return <Redirect to={`/records/${redirectTo}`} />;
};
