import {makeStyles} from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
	wrapper:{
		height:'100%',
		display:'flex',
		flexDirection:'column',
	}
	,title:{
		textAlign:'center',
		color:'grey',
		fontSize:'.8em'
	},
	carList:{
		display:'flex',
		flexDirection:'column',
		overflowY:'scroll',
		'borderTop':'2px solid #ddd',
		maxHeight:300,
		'borderBottom':'2px solid #ddd',
		marginBottom:theme.spacing(1),
	}
	,car:{
		display:'flex',
		justifyContent:'space-between',
		alignItems:'center',
		padding:theme.spacing(1),
		margin:theme.spacing(.2),
		border:'2px solid transparent',
		borderRadius:theme.shape.borderRadius,
		cursor:'pointer'
	},
	selectedCar:{
		display:'flex',
		justifyContent:'space-between',
		alignItems:'center',
		padding:theme.spacing(1),
		margin:theme.spacing(.2),
		border:'2px solid black',
		borderRadius:theme.shape.borderRadius,
		cursor:'pointer'
	},
	time:{
		color:'#0d6efd',
		fontWeight:'400'
	},
	price:{
		fontSize:'medium',
		color:'grey'
	},
	priceContainer: {
		display:'flex',
		alignItems:'center',
		justifyContent:'end'
	},
	carDetails:{
		marginLeft:theme.spacing(1),
		display:'flex',
		flexDirection:'column'
	},
	service:{
		fontSize:'medium'
	}

}))