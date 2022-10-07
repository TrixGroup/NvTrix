import {makeStyles} from '@mui/styles';


export const useStyles = makeStyles((theme) => ({
	wrapper:{
		width:'100%',
		height:'100%',
		// backgroundColor:'red',
	},
	rideSelectorContainer:{
		width:'100%',
		height:'100%'
	},
	confirmButton:{
		padding:theme.spacing(1),
		paddingTop:theme.spacing(1),
		paddingBottom:theme.spacing(1),
		fontWeight:'bolder',
		fontSize:'1.3em'
	}
}));