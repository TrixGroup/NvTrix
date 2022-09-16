import React,{useEffect} from 'react';

import {Paper,Grid} from '@mui/material';
import Appbar from '../../components/Appbar/Appbar';
import LocationSelector from '../../components/LocationSelector/LocationSelector';
import Confirm from '../../components/Confirm/Confirm';
import Map from '../../components/Map/map';

import useStyles from './style';
 																																																																																																																		
const BookPlace = (props) =>{
	
	const classes = useStyles();

	useEffect(()=>{
		document.title = "Book Place";
	},[]);

	return (
			<Grid 
				container 
				className={classes.root} 
				alignItems={'center'}
				justifyContent={'center'}
				style={{position:'relative'}}
			>							
				<Appbar/>
				<div className={classes.form}>
					<Paper
						className={classes.innerForm}
					>
						<LocationSelector/>
						<Confirm/>
					</Paper>
				</div>
				<Map />
			</Grid>
	);
}

export default BookPlace;