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

export const AppNavbar = () => {
	return (
		<Navbar className={Classes.DARK}>
			<NavbarGroup align={Alignment.LEFT}>
				<NavbarHeading>Tempocracy</NavbarHeading>
				<NavbarDivider />
				<AnchorButton href='/' text='My Records' minimal={true} />
			</NavbarGroup>
		</Navbar>
	);
};
