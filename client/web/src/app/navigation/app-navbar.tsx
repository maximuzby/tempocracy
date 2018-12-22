import {
	Alignment,
	Button,
	Classes,
	Navbar,
	NavbarDivider,
	NavbarGroup,
	NavbarHeading,
} from '@blueprintjs/core';
import * as React from 'react';
import { router } from './router';

export const AppNavbar = () => {
	const gotoHome = () => {
		router.goTo('home');
	};
	const goto404 = () => {
		router.goToNotFound();
	};
	return (
		<Navbar className={Classes.DARK}>
			<NavbarGroup align={Alignment.LEFT}>
				<NavbarHeading>Tempocracy</NavbarHeading>
				<NavbarDivider />
				<Button minimal={true} text='My Records' onClick={gotoHome} />
				<Button minimal={true} text='404' onClick={goto404} />
			</NavbarGroup>
		</Navbar>
	);
};
