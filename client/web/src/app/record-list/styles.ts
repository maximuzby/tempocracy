import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

const PADDING_MULTIPLIER = 20;

export const styles = (theme: Theme) =>
	createStyles({
		root: {
			textAlign: 'center',
			paddingTop: theme.spacing.unit * PADDING_MULTIPLIER,
		},
		textField: {
			marginLeft: theme.spacing.unit,
			marginRight: theme.spacing.unit,
			width: 500,
		},
		buttons: {
			margin: theme.spacing.unit,
			position: 'absolute',
		},
		icon: {
			margin: theme.spacing.unit,
			fontSize: 32,
			cursor: 'pointer',
			position: 'absolute',
		},
	});
