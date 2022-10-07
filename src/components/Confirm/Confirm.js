import React,{useContext} from 'react';

import {Button} from '@mui/material'

import RideSelector from '../RideSelector/RideSelector';

// import the style
import {useStyles} from './style';

import {TrixContext} from '../../Context/TrixContext';

const Confirm = ()=>{

	const classes = useStyles();

	const {selectedRide,setPickupCoordinates,dropoffCoordinates} = useContext(TrixContext);

	const storeTripDetails = async ()=>{

	}

	return (
		<div className={classes.wrapper}>
			<div className={classes.rideSelectorContainer}>
				{/* Ride Selector */}
				{/*<RideSelector/>*/}
				{setPickupCoordinates && dropoffCoordinates && (<RideSelector />)}
			</div>
			<div className={classes.confirmButtonContainer}>
				<div className={classes.confirmButtonContainer}>
					<Button
						className={classes.confirmButton}
						onClick={()=>storeTripDetails()}
						variant={'contained'}
						fullWidth
						style={{backgroundColor:'#000'}}
						disabled={selectedRide ? false :true}
					>
						Confirm {selectedRide.service || 'Trix1'}
					</Button>
				</div>
			</div>
		</div>
	)
}

export default Confirm;