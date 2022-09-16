import React, {useState,useContext } from 'react';

import AutoComplete from '../AutoComplete';
import GeoApifyAutoComplete from '../AutoComplete/GeoApifyAutoComplete';
import {Paper,InputBase,Button,Collapse,TextField,MenuItem} from '@mui/material';

import {MyLocation,LocationOn,NordicWalking,PedalBike,CarRepair,DirectionsBus,DirectionsCar} from '@mui/icons-material';

// import style
import {useStyles} from './style';

// import TrixContext
import {TrixContext} from '../../Context/TrixContext';

import TypeWriter from '../TypeWriter';

const getRoute = ({from,to}) => {

}

const FindPathLocationSelector = () => {

	// check wether the input box is selected
	const [inFocus,setInFocus] = useState('from');

	// initialising the class variable
	const classes = useStyles();


	const {
		pickup,
		setPickup,
		dropoff,
		setDropOff,
		setPickupCoordinates,
		setDropOffCoordinates,
		profile,
		setProfile
	} = useContext(TrixContext);

	const handleChangeProfile = (e) => {
		setProfile(e.target.value);
	}

    return (
        <div className={classes.container}>
        	<div className={classes.title}>
        		<TypeWriter 
        			speed={10}
        			text={`${(inFocus === 'from')? 'Where do you want to start?' : 'Where to?'}`}
        		/>
        	</div>
        	<div className={classes.inputBoxes}>
        		
        		{/*<AutoComplete 
        				icon={<MyLocation/>}
	        			style={{maxWidth:'none'}}
	        			placeholder={'Enter Origin Location'}
	        			value = {pickup}
	        			onResult = {(data)=>{
	        				setPickupCoordinates([data.longitude,data.latitude])
	        			}}
	        			onFocus={()=>{
	        				setInFocus('from');
	        			}}
	        			onChange={(e)=>{
	        				setPickup(e.target.value);
	        			}}
        			/>*/}

        			<GeoApifyAutoComplete
        				icon={<MyLocation/>}
	        			style={{maxWidth:'none'}}
	        			placeholder={'Enter Origin Location'}
	        			value = {pickup}
	        			onResult = {(data)=>{
	        				setPickupCoordinates([data.properties.lon,data.properties.lat]);
	        			}}
	        			onFocus={()=>{
	        				setInFocus('from');
	        			}}
	        			onChange={(e)=>{
	        				setPickup(e.target.value);
	        			}}
        			/>

        			<AutoComplete 
        				icon={<LocationOn/>}
	        			style={{maxWidth:'none'}}
	        			placeholder={'Enter Destination Location'}
	        			value = {dropoff}
	        			onResult = {(data)=>{
	        				setDropOffCoordinates([data.longitude,data.latitude])
	        			}}
	        			onFocus={()=>{
	        				setInFocus('to');
	        			}}
	        			onChange={(e)=>{
	        				setDropOff(e.target.value)
	        			}}
        			/>
        			<TextField
						fullWidth
						select
						onChange={handleChangeProfile}
						label="profile"
						value={profile}
						className={classes.profile}
						helperText = {'mode of transport'}
					>
						<MenuItem value={'walking'}><NordicWalking /> Walking</MenuItem>
						<MenuItem value={'cycling'}><PedalBike/> Cycling</MenuItem>
						<MenuItem value={'driving'}><DirectionsCar/> Driving</MenuItem>
					</TextField>
        	</div>
        </div>
    );
};

FindPathLocationSelector.displayName = 'FindPathLocationSelector';

export default FindPathLocationSelector;
