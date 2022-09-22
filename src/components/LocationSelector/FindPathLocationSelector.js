import React, { useState, useContext } from 'react';

import AutoComplete from '../AutoComplete';
import GeoApifyAutoComplete from '../AutoComplete/GeoApifyAutoComplete';
import { Paper, InputBase, Button, Collapse, TextField, MenuItem, ToggleButtonGroup, ToggleButton } from '@mui/material';

import { MyLocation, LocationOn, PedalBike, CarRepair, DirectionsBus, DirectionsCar,NordicWalkingSharp } from '@mui/icons-material';

import { FaWalking, FaCar, FaBicycle, FaCircle, FaSquare } from "react-icons/fa";

// import style
import { useStyles } from './style';

// import TrixContext
import { TrixContext } from '../../Context/TrixContext';

import TypeWriter from '../TypeWriter';

const FindPathLocationSelector = () => {

    // check wether the input box is selected
    const [inFocus, setInFocus] = useState('from');

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

    const handleChangeProfile = (e,profile) => {
        setProfile(profile);
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
        				icon={<FaCircle style={{transform:'scale(.7)',marginLeft:'.3em'}}/>}
	        			style={{maxWidth:'none'}}
	        			placeholder={'Enter Origin Location'}
	        			value = {pickup}
	        			onResult = {(data)=>{
	        				setPickupCoordinates([data.properties.lat,data.properties.lon]);
	        			}}
	        			onFocus={()=>{
	        				setInFocus('from');
	        			}}
	        			onChange={(e)=>{
	        				setPickup(e.target.value);
	        			}}
        			/>

        			<GeoApifyAutoComplete 
        				icon={<FaSquare style={{transform:'scale(.7)',marginLeft:'.3em'}}/>}
	        			style={{maxWidth:'none'}}
	        			placeholder={'Enter Destination Location'}
	        			value = {dropoff}
	        			onResult = {(data)=>{
	        				setDropOffCoordinates([data.properties.lat,data.properties.lon])
	        			}}
	        			onFocus={()=>{
	        				setInFocus('to');
	        			}}
	        			onChange={(e)=>{
	        				setDropOff(e.target.value)
	        			}}
        			/>
        			{/*<TextField
						fullWidth
						select
						onChange={handleChangeProfile}
						label="profile"
						value={profile}
						className={classes.profile}
						helperText = {'mode of transport'}
					>
						<MenuItem value={'walking'}><FaWalking /> Walking</MenuItem>
						<MenuItem value={'cycling'}><FaBicycle/> Cycling</MenuItem>
						<MenuItem value={'driving'}><FaCar/> Driving</MenuItem>
					</TextField>*/}
					<ToggleButtonGroup
						value={profile}
					    exclusive
					    onChange={handleChangeProfile}
					    aria-label="text alignment"
					    fullWidth
					    sx={{ bgcolor: 'background.paper',color:'#000'}}
					>
						<ToggleButton value="walking" aria-label="walking">
				        	<NordicWalkingSharp />
				      	</ToggleButton>
				      	<ToggleButton value="cycling" aria-label="cycling">
				        	<PedalBike />
				      	</ToggleButton>
				      	<ToggleButton value="driving" aria-label="driving">
				        	<DirectionsCar />
				      	</ToggleButton>
					</ToggleButtonGroup>
        	</div>
        </div>
    );
};

FindPathLocationSelector.displayName = 'FindPathLocationSelector';

export default FindPathLocationSelector;