import React from 'react';
import {Typography} from '@mui/material';
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
		backgroundColor:'#f5f5f5',
		borderRadius:theme.shape.borderRadius,
		'&:hover':{
			backgroundColor:'rgba(0,0,0,.5)'
		}
	},
	right:{
		display:'flex',
		alignItems:'center',
		flexDirection:'column'
	}
}));


const GetIcon = props =>{
	var {modifier='',type} = props;
	if(modifier){
		modifier = `_${modifier}`;
	}
	let icon = `https://github.com/mapbox/directions-icons/blob/master/src/png/dark/direction_${type}${modifier}.png?raw=true`;
	return <img src={icon} alt={modifier} width={16} height={16} style={{marginRight:5}}/>
}


const DirectionsIntructions = (props) =>{
	const {steps} = props;

	const classes = useStyles();

	const toKm = value =>{
		if(value < 1000){
			return value + ' m';
		}
		return (value/1000).toFixed(2) + ' Km';
	}

	const toHr = value =>{
		return (value/60).toFixed(2);
	}	

	return (
		<div style={{width:'100%'}}>
			{steps?.map((step,i)=>(
				<div className={classes.list}>
					<GetIcon modifier={step.maneuver.modifier?step.maneuver.modifier:''} type={step.maneuver.type} />
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
								Distance : {toKm(step.distance)} | Duration : {toHr(step.duration)}
							</Typography>
					</div>
				</div>
			))}
		</div>
	)
}


export default DirectionsIntructions;