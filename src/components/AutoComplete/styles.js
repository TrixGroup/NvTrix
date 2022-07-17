import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
	search: {
		display: 'flex',
		alignItems: 'center',
		width: '100%',
		position: 'relative',
		// backgroundColor:'rgba(255,255,255,.9)',
		boxShadow: '0px 1px 5px rgba(0,0,0,.1)',
		borderRadius: theme.shape.borderRadius,
	},
	input: {
		borderRadius: theme.shape.borderRadius,
		paddingTop: theme.spacing(1),
		paddingRight: theme.spacing(1),
		paddingBottom: theme.spacing(1),
		fontSize: '2.5em',
	},
	wrapper: {
		maxWidth: 400,
		width: '100%',
		display: 'block',
		backgroundColor: '#fff',
		borderRadius: theme.shape.borderRadius,
		marginBottom: theme.spacing(1),
		[theme.breakpoints.down('sm')]: {
			width: '100%'
		}
	},
	searchInput: {
		backgroundColor: 'inherit',
		display: 'block',
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		// boxShadow: '0px 1px 5px 3px rgba(0,0,0,.12)'
	},
	icon: {
		marginLeft: 2,
		cursor: 'pointer'
	},
	autoCompleteBox: {
		position: 'absolute',
		left: 0,
		right: 0,
		zIndex: 999,
		margin: 'auto',
		maxHeight: 210,
		overflowY: 'auto',
		backgroundColor: '#fff',
		marginTop: theme.spacing(.6),
		padding:0,
		borderRadius: theme.shape.borderRadius,
		'&::-webkit-scrollbar': {
			backgroundColor: 'rgba(0,0,0,.3)',
			borderRadius: `0px ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0`,
			width: 5,
		},
		'&::-webkit-scrollbar-thumb': {
			// borderRadius:theme.shape.borderRadius,
			borderRadius: `0px ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0`,
		}
	},
	li: {
		listStyle: 'none',
		// padding:'8px 12px',
		padding: `${theme.spacing(.6)}px ${theme.spacing(1)}px ${theme.spacing(.3)}px ${theme.spacing(1)}px`,
		width: '100%',
		cursor: 'pointer',
		textAlign: 'left',
		color: 'rgb(34, 33, 33)',
		borderBottom: '1px solid #ddd',
		backgroundColor: '#d1d1d1',
		align: 'left',
		// borderRadius:theme.shape.borderRadius,
		'&:hover': {
			backgroundColor: '#f5f5f5'
		},
		'& p,small': {
			padding: 0,
			margin: 0,
			paddingLeft: theme.spacing(.6),
			paddingRight: theme.spacing(.6),
		},
		'& p:first-child': {
			fontSize: '.9em',
		}
	}
}));
