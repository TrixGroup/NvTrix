import React,{ useState,useEffect } from 'react';
import {MenuItem,Grid,TextField,Paper,Typography,Button,CircularProgress,Tabs,Tab,Box,IconButton,useMediaQuery,Modal,Container} from '@mui/material';
import {Cancel,EditLocationAlt,AssistantDirection,Search,ArrowBackOutlined,VisibilityOff, Visibility} from '@mui/icons-material';

import APIService from '../../Service/APIService';

import {CustomSnackbar} from '../../components/SnackBar/';
import AutoComplete from '../../components/AutoComplete';
import Map from '../../components/Map';
import Popup from '../../components/Popup/Popup';
import DirectionsIntructions from '../../components/DirectionsIntructions/';

import DirectionsIcon from '@mui/icons-material/Directions';
import MapIcon from '@mui/icons-material/Map';

import {useStyles} from './styles1';
import clsx from "clsx";

const pos = {
	latitude:0,				
	longitude:0,
	label:''
}

const initailDisplay = {
	map:true,
	instruction:false,
	destination:false
 }


const FindPath = () =>{
	const [display,setDisplay] = useState(initailDisplay)

	const classes = useStyles();
	const isMobile = useMediaQuery('(max-width:600px)');
	const [error,setError] = useState(false);

	const [isLoading,setIsLoading] = useState(false);
	const [origin,setOrigin] = useState(pos);
	const [destination,setDestination] = useState(pos);
	const [profile,setProfile] = useState('walking');

	const [instruction,setInstructions] = useState(false);

	const [distance,setDistance] = useState(0);
	const [duration,setDuration] = useState(0);
	const [steps,setSteps] = useState([]);
	const [routesCoordinates,setRoutesCoordinates] = useState([[0,0],[0,0]]);

	const [tabValue,setTabValue] = useState('map');
	const [visible,setVisible] = useState(false);

	const handleChangeProfile = (e)=>{
		setProfile(e.target.value);
	}

	const drawRoute = (e)=>{
		e.preventDefault();
		setIsLoading(true);
		console.log('Origin : ',origin);
		console.log('Destination : ',destination);
		APIService.getRoute({
			profile:profile,
			coords:[
				[origin.longitude,origin.latitude],
				[destination.longitude,destination.latitude]
			]
		})
		.then((data)=>{
			setIsLoading(false);
			setDisplay(initailDisplay);
			console.log(data);
			if(data){
				setInstructions(true);
				setDistance((data.routes[0].distance * 0.001).toFixed(2)); // multiplying the distance by (1/1000) to convert it to km
				setDuration((data.routes[0].duration / 60).toFixed(2)); //diving the duration by 60 to convert it to min
				setSteps(data.routes[0].legs[0].steps);
				console.log(steps);
				setRoutesCoordinates(data.routes[0].geometry);
			}
			
		})
		.catch(err=>setError(true));

	}

	const closePopUp = (value)=>{
		setDisplay(initailDisplay);
		setTabValue('map');
	}

	useEffect(()=>{
		setDisplay({map:true,instruction:false,destination:false});
		setTabValue('map');
	},[isMobile])

	console.log({isMobile});

  return (
    <Grid container className={classes.container}>
    	<Grid item md={3.2} sm={3.2} className={classes.left}>
    		<Paper onSubmit={drawRoute} component={'form'} className={classes.form} method={'post'} square={true} autoComplete={'off'}>
    			<Typography variant={'h5'}>Fill the information below</Typography>
				<AutoComplete placeholder={'Enter your origin'} onResult={(result)=>setOrigin(result)}/>
				<AutoComplete placeholder={'Enter Your Destination'} onResult={(result)=>setDestination(result)} />
				<TextField
					sx={{p:'0px'}}
					fullWidth
					size={'small'}
					select
					onChange={handleChangeProfile}
					label="profile"
					value={profile}
					helperText = {'mode of transport'}
					>
					<MenuItem value={'walking'}>Walking</MenuItem>
					<MenuItem value={'cycling'}>Cycling</MenuItem>
					<MenuItem value={'driving'}>Driving</MenuItem>
				</TextField>
    			<div style={{display:'flex',gap:8,alignItems:'center',justifyContent:'space-between',width:'100%'}}>
				<Button
					style={{cursor:'pointer',padding:8}}
					variant={'contained'}
					fullWidth
					size={'small'}
					startIcon={<ArrowBackOutlined/>}
					// endIcon={<MyLocation/>}
					onClick={()=>{
						window.history.back();
					}}
				>
					Back
				</Button>
				<Button
					size={'small'}
    				startIcon={<DirectionsIcon/>}
    				fullWidth
    				variant={'contained'}
    				color={'success'}
    				type={'submit'}
    				style={{padding:8,cursor:'pointer'}}
    			>Draw Route</Button>
				</div>
    		</Paper>
    		{instruction && (
    			<Paper square={true} className={classes.intructions_container} >
		  			<div className={classes.dist_time}>
		  				<Typography variant={'body1'}>Distance : {distance} km</Typography>
		  				<Typography variant={'body1'}>Time : {duration} min</Typography>
		  			</div>
		  			<Typography variant="h4" align={'center'}>Instructions</Typography>
		  			<DirectionsIntructions stpes={steps}/>
    		</Paper>
    		)}
    		
    	</Grid>
    	<Grid item md={8.8} sm={8.8} className={classes.right}>
    				{isLoading ? (
    			<div className={classes.loadingDiv}>
    				<Typography align="center" variant={"h4"} gutterBottom>Fetching Data</Typography>
    				<CircularProgress size={'5em'} thickness={2}/>
    				<Typography align="center" variant={"body1"}>PLease Wait</Typography>
    			</div>):(
    				<div style={{width:'100%',height:'100%',position:'relative',overflowY:'auto'}}>
    				{visible && (
    					<div
    					className={clsx(classes.tabs,classes.tabsShow)}
    					>
    					<Box>
    						<Tabs 
    							variant="fullWidth" 
    							value={tabValue}
    							onChange={(event,value)=>setTabValue(value)}
    							textColor="inherit"
    							indicatorColor="primary"
    						>
    							<Tab 
    								size={'small'} 
    								icon={<EditLocationAlt/>}  
    								value="trip" 
    								label="Trip"
    								onClick={(e)=>{
    									setDisplay({
    										map:false,
												instruction:false,
												destination:true
    									})
    									setTabValue('trip');
    								}}
    							/>
    							<Tab 
    								size={'small'} 
    								icon={<MapIcon/>}  
    								value="map" 
    								label="Map"
    								onClick={(e)=>{
    									setDisplay({
    										map:true,
												instruction:false,
												destination:false
    									})
    									setTabValue('map');
    								}}
    							/>
    							<Tab 
    								size={'small'} 
    								icon={<AssistantDirection/>}  
    								value="instructions" 
    								label="Intructions"
    								onClick={(e)=>{
    									setDisplay({
    										map:false,
												instruction:true,
												destination:false
    									});
    									setTabValue('instructions');
    								}}
    							/>

    						</Tabs>
	    					</Box>
	    				</div>
    				)}
    				
    				<div className={classes.floatBtn}>
    					<IconButton onClick={()=>setVisible(!visible)}>
    						{!visible ? (<Visibility style={{color:'#fff'}}/>):(<VisibilityOff style={{color:'#fff'}}/>)}
    					</IconButton>
    				</div>
    				{(display.destination) && (
    					<Modal open={display.destination}>
    						<Container className={classes.modalContainer}>
    							<form className={classes.modalForm} onSubmit={drawRoute}>
    								<Typography variant={'h4'} align={'center'}>Find Path</Typography>
    								<div className={classes.modalItem}>
    									<AutoComplete placeholder={'Enter your origin'} onResult={(result)=>setOrigin(result)}/>
    								</div>
    								<div className={classes.modalItem}>
												<AutoComplete placeholder={'Enter Your Destination'} onResult={(result)=>setDestination(result)} />
    								</div>
    								<div className={classes.modalItem}>
    									<TextField
							    				fullWidth
							    				select
							    				sx={{p:'2px',boxShadow: '0px 1px 5px rgba(0,0,0,.001)'}}
							    				onChange={handleChangeProfile}
							    				label="profile"
							    				value={profile}
							    				variant={'outlined'}
							    				
							    				helperText = {'mode of transport'}
							    			>
							    			<MenuItem value={'walking'}>Walking</MenuItem>
							    			<MenuItem value={'cycling'}>Cycling</MenuItem>
							    			<MenuItem value={'driving'}>Driving</MenuItem>
							    		</TextField>
    								</div>
    								<div className={classes.modalForm} style={{flexDirection:'row-reverse'}}>
  									<Button
  										type="submit"
  										fullWidth
  										sx={{p:'10px'}}
  										variant={'contained'}
  										startIcon={<DirectionsIcon/>}
  									>Draw Path</Button>
  									<Button
  										sx={{p:'10px'}}
  										onClick={()=>{
  											setDisplay(initailDisplay);
  											setTabValue('map');
  										}}
  										color={'secondary'}
  										fullWidth
  										variant={'contained'}
  										startIcon={<Cancel/>}
  									>
  										Cancel
  									</Button>
  									</div>
    							</form>
    						</Container>
    					</Modal>
    				)}
    				
    				<Map 
	    					origin={origin} 
	    					destination={destination}
	    					routesCoordinates={routesCoordinates}
	    					onRouteDraw={(F)=>console.log({F})}
	    					style={{
		    					width:'100%',
		    					height:'100%',
		    					backgroundColor:'red',
	    					}}
    					/>

    				<CustomSnackbar 
    					open={error}
    					message={'You Are Currently Offline!'}
    					textAction={''}
    					duration={50000}
    					actionFunction={(e)=>{console.log(e)}}

    				/>

    				{display.instruction && (
    					<Popup
    						className={classes.popup}
    						fullScreen={true}
    						onClose={(e)=>{
    							setTabValue('map');
    						}}
    						openPopup={display.instruction}
    						children={
    							<div style={{width:'100%'}}>
    								{instruction?(
    									<>
    										{origin.label && (
		    									<>
		    										<Typography>Going</Typography>
		    										<Typography>From : {origin.label}</Typography>
		    									</>
		    								)}
		    								{destination.label && (
		    									<Typography>To : {destination.label}</Typography>
		    								)}
			    							<div style={{display:'flex',width:'100%',alignItems:'center',justifyContent:'space-between',gap:30}}>
			    								<Typography>Distance {distance} km</Typography>
			    								<Typography>Time {duration} Hr</Typography>
			    							</div>
			    							<DirectionsIntructions steps={steps}/>
    									</>
    								):(
    									<>
    										<Typography align={'center'}>You Must Select An Origin An A Destination</Typography>
    										<Button
    											fullWidth 
    											onClick={()=>{
	    											setDisplay({
	    												...initailDisplay,destination:true
	    											})
    										}}>Select A Trip</Button>
    									</>
    								)}
    								
	    						</div>

    						}
    						title={'Instructions'}
    						setOpenPopup={closePopUp}
    					/>
    				)}
    				
    				</div>
    				)
    			}
    	</Grid>
    </Grid>
  );
}

export default FindPath;
