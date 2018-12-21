import {
	Alignment,
	AnchorButton,
	Classes,
	Navbar,
	NavbarDivider,
	NavbarGroup,
	NavbarHeading,
} from '@blueprintjs/core';
import * as React from 'react';
import { Link } from 'react-router-dom';

export const AppNavbar = () => {
	return (
		<Navbar className={Classes.DARK}>
			<NavbarGroup align={Alignment.LEFT}>
				<NavbarHeading>Tempocracy</NavbarHeading>
				<NavbarDivider />
				<Link className='bp3-button bp3-minimal' to='/'>
					My Records
				</Link>
			</NavbarGroup>
		</Navbar>
	);
};
