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
		pointerEvent:'none',
	},
	btn:{
		borderRadius:theme.shape.borderRadius,
		backgroundColor:'red',
		// padding:theme.spacing(1),
	},
	searchPopup:{
		position:'absolute',
		zIndex:1099,
		top:0,
		left:0,
		width:'100%',
		height:'100%',
		pointerEvent:'none',
		display:'flex',
		justifyContent:'center',
		alignItems:'center',
		backgroundColor:'rgba(255,255,255,.3)',
		backdropFilter:'blur(2px)',
		transition:'all 1s'
	},
	autocomplete_wrapper:{
		[theme.breakpoints.down('sm')]:{
			width:'90%'
		},
		[theme.breakpoints.up('sm')]:{
			width:'50%'
		}
	}
}))