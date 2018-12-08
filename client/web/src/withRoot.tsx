import green from '@material-ui/core/colors/green';
import purple from '@material-ui/core/colors/purple';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import * as React from 'react';

const theme = createMuiTheme({
	palette: {
		primary: purple,
		secondary: green,
	},
	typography: {
		useNextVariants: true,
	},
});

export const withRoot = <P extends {}>(Component: React.ComponentType<P>) => (
	props: P,
) => {
	return (
		<MuiThemeProvider theme={theme}>
			<CssBaseline />
			<Component {...props} />
		</MuiThemeProvider>
	);
};
