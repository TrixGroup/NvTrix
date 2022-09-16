import React, {useState ,useEffect,useContext} from 'react';

import {
    Grid,
    Paper,
    Typography,
    Button,
    IconButton,
    useMediaQuery,
    Modal,
    Container,
    Collapse
} from '@mui/material';

import { 
	Cancel, 
	EditLocationAlt, 
	AssistantDirection, 
	ArrowBackOutlined, 
	VisibilityOff, 
	Visibility 
} from '@mui/icons-material';

import FindPathLocationSelector from '../../components/LocationSelector/FindPathLocationSelector';

import Popup from '../../components/Popup/Popup';

import DirectionsIntructions from '../../components/DirectionsIntructions/';

import {TrixContext} from '../../Context/TrixContext';

import Map from '../../components/Map/map';

import {FindPathTab} from '../../components/Tabs'

// import the class
import { useStyles } from './style';

const TracePath = () => {

    const classes = useStyles();

    const {
        display,
        setDisplay,
        setTabValue,
        initailDisplay,
        instructions,
        pickup,
        dropoff,
        profile,
        pickupCoordinates,
        dropoffCoordinates,
        duration,
        distance,
        steps
    } = useContext(TrixContext);

    // to check whether it is a tablet or desktop
    const isMobile = useMediaQuery('(max-width:600px)');

    const [visible, setVisible] = useState(false);

    useEffect(()=>{
        if(!isMobile){
            setVisible(false);
            setTabValue('map');
            setDisplay(initailDisplay);
        }
    },[isMobile,setTabValue]);


    const closePopUp = (value)=>{
        setDisplay(initailDisplay);
        setTabValue('map');
    }

    useEffect(()=>{
        document.title = "Trace Path";
    },[]);

    return (
        <Grid container className={classes.container}>
        	<Grid item md={3.2} className={classes.left}>
        		<FindPathLocationSelector />
        		<div
        			className={classes.groupBtn}
        		>
        			<Button
        				style={{
        					backgroundColor:'#000',
                            fontWeight:'bolder',
        				}}
        				variant={'contained'}
        				startIcon={<ArrowBackOutlined/>}
                        onClick={()=>{
                            window.history.back();
                        }}
        			>Back</Button>
        		</div>
                {instructions && (
                    <Paper square={true}>
                        <div>
                            <Typography variant={'body1'}>Distance : <span>{distance}</span> km</Typography>
                            <Typography variant={'body1'}>Time : <span>{duration}</span> min</Typography>
                        </div>
                        <Typography variant="h4" align={'center'}>Instructions</Typography>
                        <DirectionsIntructions steps={steps}/>
                    </Paper>
                )}
        	</Grid>
        	<Grid item  md={8.8} className={classes.right}>
        		<Map/>
                
                <div className={classes.floatBtn}>
                    <IconButton onClick={()=>setVisible(!visible)}>
                        {!visible ? (<Visibility style={{color:'#fff'}}/>):(<VisibilityOff style={{color:'#fff'}}/>)}
                    </IconButton>
                </div>

        		<Collapse 
        			in={visible} 
        			timeout="auto"
        			unmountOnExit
        		>
                   <div className={classes.tab}>
                        <FindPathTab />                   
                    </div> 
        		</Collapse>

                {(display.trip) && (
                    <Modal open={display.trip} style={{width:'100%',height: '100%',padding:'.4em'}}>
                        <Container className={classes.modalContainer}>
                            <FindPathLocationSelector />
                            <div
                                className={classes.groupBtn}
                            >
                                <Button
                                    onClick={()=>{
                                        setDisplay(initailDisplay);
                                        setTabValue('map');
                                    }}
                                    style={{
                                        padding:'.8em',
                                        backgroundColor:'#000'
                                    }}
                                    variant={'contained'}
                                    startIcon={<Cancel/>}
                                >Close</Button>
                            </div>
                        </Container>
                    </Modal>
                )}

                {(display.instruction) && (
                    <Popup
                        fullScreen={true}
                        onClose={(e)=>{
                            setTabValue('map');
                        }}
                        openPopup={display.instruction}
                        title={'Instructions'}
                        setOpenPopup={closePopUp}
                    >
                        <div style={{width:'100%'}}>
                            {(instructions)?(
                                <>
                                    {pickupCoordinates && (
                                        <div>
                                            <Typography>Going From :</Typography>
                                            <Typography>{pickup}</Typography>
                                        </div>
                                    )}

                                    {dropoffCoordinates && (
                                        <div>
                                            <Typography>To :</Typography>
                                            <Typography>{dropoff}</Typography>
                                        </div>
                                    )}

                                    <div>
                                        <Typography>By {profile}</Typography>
                                    </div>

                                    <div>
                                        <Typography>Distance <span>{distance}</span> km</Typography>
                                        <Typography>Duration <span>{duration}</span></Typography>
                                    </div>

                                    <DirectionsIntructions steps={steps}/>
                                </>
                            ):(
                                <>
                                    <Typography align={'center'}>You must select an origin an destination</Typography>
                                    <Button
                                        // variant={'contained'}
                                        // style={{backgroundColor:'#000'}}
                                        style={{fontWeight:'bold'}}
                                        fullWidth 
                                        onClick={()=>{
                                            setDisplay({
                                                ...initailDisplay,trip:true
                                            });
                                            setTabValue('trip');
                                    }}>Select A Trip</Button>
                                </>
                            )}
                        </div>
                    </Popup>
                )}
        	</Grid>
        </Grid>
    );
};

export default TracePath;