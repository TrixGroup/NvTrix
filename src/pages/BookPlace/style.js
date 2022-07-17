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
	form:{
		padding:theme.spacing(1),
		width:'100%',
	},
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
	}

}));

export default useStyles;