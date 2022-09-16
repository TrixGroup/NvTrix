import {makeStyles} from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
	container:{
		width:'100%',
		height:'100%',
		maxHeight:'100vh',
		overflowY:'auto',
		// backgroundColor:'#f5f5f5'
	},
	left:{
		height: '100%',
		position: 'sticky',
		overflowY:'auto',
		top:0,
		padding:theme.spacing(1.3),
		backgroundColor:'#f0f0f0',
		[theme.breakpoints.down('sm')]:{
			display:'none',
			pointerEvent:'none',
		}
	},
	right:{
		position:'relative',
		height:'100%',
		overflowY:'auto',
		backgroundColor:'#345',
		color:'#f5f5f5',
		[theme.breakpoints.down('sm')]:{
			width:'100vw',
			height:'100vh',
		}
	},
	tab:{
		position:'absolute',
		left:0,
		right:0,
		bottom:30,
		backgroundColor:'#f5f5f5',
		color:'#434',
		borderRadius:theme.shape.borderRadius,
		padding:8,
		zIndex: 999,
		// width:'100%',
		justifyContent:'center',
		// maxWidth: 400,
		margin:theme.spacing(1),
	},
	groupBtn:{
		marginLeft:theme.spacing(1.3),
	},
	floatBtn:{
		position:'absolute',
		top:theme.spacing(1),
		left:theme.spacing(1),
		zIndex:999,
		borderRadius:theme.shape.borderRadius,
		backgroundColor:'rgba(0,0,0,.15)',
		[theme.breakpoints.up('sm')]:{
			display:'none',
		}
	},
	modalContainer:{
		position:'relative',
		display:'block',
		height:'100%',
		width: '100%',
		padding:theme.spacing(.6),
		margin:'auto',
		backgroundColor:'rgba(255,255,255,.30)',
		boxShadow:'0 8px 32px 0 rgba(31,38,135,0.37)',
		border:'2px solid rgba(255,255,255,.30)',
		backdropFilter:'blur(1.0px)',
		borderRadius:theme.shape.borderRadius,
		transition:'all .5s',
		// '&:active':{
		// 	backgroundColor:'rgba(255,255,255,.50)',
		// 	cursor:'pointer'
		// }
	},
}))