import {makeStyles} from '@mui/styles';

export const useStyles = makeStyles((theme)=>({
	container:{
		position:'relative'
	},
	searchBox:{
		position:'absolute',
		bottom:theme.spacing(4),
		left:theme.spacing(2),
		zIndex:999,
		borderRadius:theme.shape.boderRadius,
		backgroundColor:'rgba(0,0,0,.5)',
		display:'flex',
		justifyContent:'center',
		alignItems:'center',
		cursor:'pointer',
	},
	btn:{
		borderRadius:theme.shape.borderRadius,
		backgroundColor:'red',
		// padding:theme.spacing(1),
	}
}))