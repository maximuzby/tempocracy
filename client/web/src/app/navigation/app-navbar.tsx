import {
	Alignment,
	Button,
	Classes,
	Navbar,
	NavbarDivider,
	NavbarGroup,
	NavbarHeading,
} from '@blueprintjs/core';
import { RouterStore } from 'mobx-react-router';
import * as React from 'react';
import { Link } from 'react-router-dom';

interface Props {
	router: RouterStore;
}

export const AppNavbar = (props: Props) => {
	const onClick = () => {
		props.router.push('/');
	};
	return (
		<Navbar className={Classes.DARK}>
			<NavbarGroup align={Alignment.LEFT}>
				<NavbarHeading>Tempocracy</NavbarHeading>
				<NavbarDivider />
				<Button minimal={true} text='My Records' onClick={onClick} />
			</NavbarGroup>
		</Navbar>
	);
};
