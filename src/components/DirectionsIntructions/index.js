import {Typography} from '@mui/material';
import {Close,TurnLeft,TurnRight} from '@mui/icons-material';


import {makeStyles} from '@mui/styles';

const useStyles = makeStyles((theme)=>({
	title:{

	},
	dist_time:{
		fontSize:.6,
		backgroundColor:'f5f5f5',
	},
	list:{
		display:'flex',
		alignItems:'center',
		gap:5,
		borderRadius:theme.shape.borderRadius,
		'&:hover':{
			backgroundColor:'rgba(0,0,0,.12)'
		}
	},
	right:{
		display:'flex',
		alignItems:'center',
		flexDirection:'column'
	}
}));


const GetIcon = props =>{
	const {side} = props;

	if(side==='right'){
		return (
			<TurnRight/>
		);
	}

	if(side==='left'){
		return (
			<TurnLeft/>
		)
	}

	else{
		return <Typography>{side}</Typography>
	}
}


const DirectionsIntructions = (props) =>{
	const {steps} = props;

	const classes = useStyles();

	const toKm = value =>{
		return (value/1000).toFixed(2);
	}

	const toHr = value =>{
		return (value/60).toFixed(2);
	}	

	return (
		<div style={{width:'100%'}}>
			{steps?.map((step,i)=>(
				<div className={classes.list}>
					<GetIcon side={step.driving_side} />
					<div style={{}}>
							<Typography 
								className={classes.title} 
								align={'left'}
							>
								{step.maneuver.instruction}
							</Typography>
							<Typography 
								className={classes.dist_time} 
								align={'left'} 
								variant={'body2'}
							>
								Distance : {toKm(step.distance)} Km | Duration : {toHr(step.duration)} Hr
							</Typography>
					</div>
				</div>
			))}
		</div>
	)
}


export default DirectionsIntructions;