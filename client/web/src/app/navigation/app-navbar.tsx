import {
	Alignment,
	Button,
	Classes,
	Navbar,
	NavbarDivider,
	NavbarGroup,
	NavbarHeading,
} from '@blueprintjs/core';
import { RouterModel } from 'mst-react-router';
import * as React from 'react';

interface Props {
	router: RouterModel;
}

export const AppNavbar = (props: Props) => {
	const gotoHome = () => {
		props.router.push('/records');
	};
	return (
		<Navbar className={Classes.DARK}>
			<NavbarGroup align={Alignment.LEFT}>
				<NavbarHeading>Tempocracy</NavbarHeading>
				<NavbarDivider />
				<Button minimal={true} text='My Records' onClick={gotoHome} />
			</NavbarGroup>
		</Navbar>
	);
};
