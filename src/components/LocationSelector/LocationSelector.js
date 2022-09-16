import { useState, useContext } from 'react';

import AutoComplete from '../AutoComplete';
import { Paper, InputBase, Button, Collapse } from '@mui/material';

import { Numbers, MyLocation, LocationOn, ExpandLess, ExpandMore } from '@mui/icons-material';

import { useStyles } from './style';

import { TrixContext } from '../../Context/TrixContext';

import TypeWriter from '../TypeWriter';

const LocationSelector = () => {

    const classes = useStyles();
    const [inFocus, setInFocus] = useState('from');

    const { pickup, setPickup, dropoff, setDropOff, numberOfPlace, setNumberOfPlace } = useContext(TrixContext)

    const [focus, setFocus] = useState(false);
    const [collapse, setCollapse] = useState(false);

    const [expand, setExpand] = useState(false);

    const handlePlaceChange = (e) => {
        const ptn = /^[0-9]+$/;
        // console.log('ptn : /(\D)+/',' text : ',e.target.value,'Test :',/(\D)+/.test(e.target.value))
        if (ptn.test(e.target.value)) {
            const f = parseInt(e.target.value);
            // console.log(f);
            if (f >= 5) {
                setNumberOfPlace(5);
            } else if (f <= 1) {
                setNumberOfPlace(1);
            } else {
                setNumberOfPlace(e.target.value);
            }
        }

        if (e.target.value === '') {
            setNumberOfPlace('');
        }
    }
    console.log({ inFocus });
    return (
        <div className={classes.container}>
        	<div className={classes.searchHeader}>
        		<TypeWriter 
        			text={`${(inFocus === 'from')?'Where can we pick you up?':'Where can we drop you to?'}`} 
        			speed={20}
        		/>
        	</div>
        	<div className={classes.inputBoxes}>
        		
        			<AutoComplete 
        				icon={<MyLocation/>}
	        			style={{maxWidth:'none'}}
	        			placeholder={'Enter Pickup Location'}
	        			value={pickup}
	        			onResult = {(data)=>{
	        				setPickup(data);
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
	        			placeholder={'Enter Dropoff Location'}
	        			value={dropoff}
	        			onResult = {(data)=>{
	        				setPickup(data);
	        			}}
	        			onFocus={()=>{
	        				setInFocus('to');
	        			}}
	        			onChange={(e)=>{
	        				setDropOff(e.target.value)
	        			}}
        			/>
        			<Collapse in={expand} timeout="auto" unmountOnExit>
	        			<div 
	        				className={classes.flex} 
	        				style={{
	        					borderColor:`${(focus)? 'black' : 'transparent'}`,
	        				}}>
	        				<Numbers 
	        					className={classes.icon}
	        					style={{
	        						display:`${(expand)? 'block':'none'}`,
	        					}}
	        				/>
		        			<InputBase
		        				className={classes.input}
		        				fullWidth
		        				sx={{ ml: 1, flex: 1 }}
		        				placeholder={'Number Of Places'}
		        				type={'number'}
		        				value={numberOfPlace}
		        				style={{
	        					display:`${(expand)? 'block':'none'}`,
		        				}}
		        				onChange={handlePlaceChange}
		        				onFocus={()=>{setFocus(true)}}
		        				onBlur={()=>setFocus(false)}
		        			/>																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																													
	        			</div>
        			</Collapse>
        			
        			<div className={classes.expand}>
        				<Button
        					className={classes.expandBtn}
        					variant={'contained'}
        					onClick={() => {setExpand(!expand);}}
        					style={{backgroundColor:'#000'}}
        				>
        					<ExpandLess 
							style={{
								transition:'all 300ms ease-in-out',
								transform:`rotate(${(expand)?'-370deg':'-180deg'}) scale(1.4)`
							}} 
							className={classes.expandBtnIcon}
        				/>
        					
        				</Button>
        				
        			</div>
        	</div>
        </div>
    );
};

export default LocationSelector;