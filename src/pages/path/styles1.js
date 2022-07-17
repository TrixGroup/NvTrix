
import { makeStyles} from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
	container:{
		width:'100%',
		height:'100%',
		maxHeight:'100vh',
		overflowY:'auto',
	},
	form:{
		padding:theme.spacing(1),
		display:'flex',
		gap:theme.spacing(1),
		alignItems:'center',
		borderRadius:0,
		flexDirection:'column',	
		// margin:theme.spacing(1),

	},
	profile:{
		padding:theme.spacing(2)
	},
	dist_time:{
		width:'100%',
		display:'flex',
		justifyContent:'space-between',
		alignItems:'center'
	},
	intructions_container:{
		padding:theme.spacing(1),
		marginBottom:theme.spacing(1),
	},
	intructions:{
		width:'100%',
		borderRadius:theme.shape.borderRadius,
		overflowY:'auto',
		maxHeight:'458px',
		padding:theme.spacing(.1),
		backgroundColor:theme.palette.info.dark,
		'&::-webkit-scrollbar':{
			backgroundColor:'transparent',
			borderRadius:`0px ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0px`,
		}
	},
	intructions_item:{
		width:'100%',
		padding:theme.spacing(1),
		// borderRadius:theme.shape.borderRadius,
		backgroundColor:'rgba(0,0,0,.7)',
		borderBottom:'1px solid #ddd',
		color:'#f5f5f5',
		cursor:'pointer',
		display:'flex',
		alignItems:'center',
		gap:5,
		'&:hover':{
			backgroundColor:'#f5f5f5',
			color:'#000',
		},
		'&:active':{
			backgroundColor:'#ddd'
		},
		
	},
	left:{
		height:'100%',
		position:'sticky',
		top:0,
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
	loadingDiv:{
		width:'100%',
		height:'100%',
		display:'flex',
		justifyContent:'center',
		alignItems:'center',
		backgroundColor:'rgba(0,0,0,.5)',
		flexDirection:'column',
		position:'absolute',
		top:0,
		right:0,
		left:0,
		bottom:0,
		margin:'auto',
		zIndex:99,
	},
	
	tabs:{
		transition:`$show 3000ms ${theme.transitions.easing.easeInOut}`,
		position:'absolute',
		left:0,
		right:0,
		bottom:30,
		margin:'auto',
		maxWidth:400,
		zIndex:999,
		borderRadius:8,
		padding:8,	
		backgroundColor:'#f5f5f5',
		color:'#434',
		transition:'all 1s',
		[theme.breakpoints.down('sm')]:{
			// marginLeft:theme.spacing(1),
			// marginRight:theme.spacing(1),
			
			display:'block',
			pointerEvent:'auto'
		},
		[theme.breakpoints.up('sm')]:{
			display:'none',
			pointerEvent:'none',
		}
	},
	tabHide:{
		transition:`$hide 3000ms ${theme.transitions.easing.easeInOut}`,
		opacity:0,
		transform:"translateX(-100%);"
	},
	"@keyframes show":{
		"0%":{
			opacity:0,
			transform:'translateY(-100p%)',
		},
		"100%":{
			opacity:1,
			transform:"translateY(0)",
			backgroundColor:'blue',
		}
	},
	"@keyframes hide":{
		"0%":{
			opacity:1,
			transform:'translateX(0)',
		},
		"100%":{
			opacity:0,
			transform:"translateX(-100%)",
		}
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
	popup:{
		[theme.breakpoints.up('sm')]:{
			display:'none'
		}
	},
	modalContainer:{
		backgroundColor:'#fff',
		padding:theme.spacing(1),
		height:'100%',
		width:'100%'
	},
	modalForm:{
		padding:theme.spacing(.5),
		width:'100%',
		display:'flex',
		gap:theme.spacing(1),
		alignItems:'center',
		flexDirection:'column'
	},
	modalItem:{
		width:'100%',
		padding:theme.spacing(1),
		borderRadius:theme.shape.borderRadius,
		position:'relative',
	},
	upper:{
		position:'absolute',
		display:'block',
		width:'100%',
		left:0,
		right:0,
		margin:'auto',
		backgroundColor:'red',
		zIndex:999,
		'& li':{
			listStyle:'none',
			padding:theme.spacing(1),
			'&:hover':{
				backgroundColor:'#f5f5f5'
			}
		}
	},
}));