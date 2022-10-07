import {makeStyles} from '@mui/styles';


const useStyles = makeStyles((theme)=>({
	root:{
		width:'100%',
		// backgroundColor:'red',
		height:'100%',
		justifyContent:'center',
		alignItems:'center',
	},
	gridItem:{
		marginTop:theme.spacing(3),
		width:'100%',
		height:'100%',
		display:'flex',
		justifyContent:'center',
		alignItems:'center',
	},
	// form:{
	// 	padding:theme.spacing(1),
	// 	width:'100%',
	// },
	baseInput:{
		padding:theme.spacing(1),
		borderRadius:theme.shape.borderRadius,
		boxShadow: '0px 1px 5px rgba(0,0,0,.1)',
	},
	flex:{
		marginTop:theme.spacing(1),
		display:'flex',
		alignItems:'center',
		justifyContent:'space-between',
	},

	form:{
		position:'absolute',
		zIndex:999,
		[theme.breakpoints.up('sm')]:{
			bottom:28,
			left:10,
			top:200,
			maxHeight:620,
			width:400,
			overflowY:'scroll',
			overflowX:'hidden'
		},
		[theme.breakpoints.down('sm')]:{
			padding:theme.spacing(1),
			zIndex:9990,
			width:'100%',
			// height:'100%',
			// width:300,
			maxHeight:'unset',
			display:'flex',
			justifyContent:'center',
			alignItems:'center',
			backgroundColor:'transparent'
		}
	},
	innerForm:{
		[theme.breakpoints.down('sm')]:{
			margin:theme.spacing(.2),
			width:'100%',
		},
		padding:theme.spacing(1),
	}

}));

export default useStyles;