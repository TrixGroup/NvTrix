import {useState} from 'react';

import {Paper,Button,TextField,Typography,Grid,InputBase} from '@mui/material';

import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import CancelIcon from '@mui/icons-material/Cancel';

import AutoComplete from '../../components/AutoComplete/';
import Appbar from '../../components/Appbar/Appbar';

import useStyles from './style';


const BookPlace = (props) =>{
	
	const classes = useStyles();

	const [booked,setBooked] = useState({
		origin:{},
		destination:{},
		numberOfPlace:'',
		price:'',
		paymentOption:'',
	});

	const handleChange = e =>{
		if(e.target.type==='number'){
			if(e.target.value<=0){
				setBooked({...booked,[e.target.name]:e.target.value});
				return;
			}
		}
		setBooked({...booked,[e.target.name]:e.target.value});
	}

	return (
		<Grid container className={classes.root} alignItems={'center'} justifyContent={'center'}>
			<Appbar/>
			<Grid item md={5} className={classes.gridItem}>
				<Paper
					elavation={9}
					className={classes.form}
					component={'form'}
					onSubmit={''}
				>
				<Typography align={'center'} variant={'h4'}>Nv Trip</Typography>
				<Typography variant={'h5'} align={'center'}>Fill The Form To Book A Place In A Vehicle</Typography>
				<div>
					<Typography>Origin</Typography>
					<AutoComplete
						style={{maxWidth:'none'}}
						placeholder={'Enter Your Origin'} 
						onResult={(e)=>{
							setBooked({...booked,origin:e});
						}}
					/>
				</div>
				<div>
					<Typography>Destination</Typography>
					<AutoComplete 
						style={{maxWidth:'none'}}
						placeholder={'Enter Your Destination'} 
						onResult={(e)=>{
							setBooked({...booked,destination:e});
						}}
					/>
				</div>
				<div>
					<Typography>Number Of Place</Typography>
					<InputBase
						min={0}
						max={10}
						required={true}
						className={classes.baseInput}
						fullWidth
						type={'number'}
						name={'numberOfPlace'}
						value={booked.numberOfPlace}
						onChange={handleChange} 
						placeholder={'Enter The Number Of Place'} 
						helperText={'Number of place you want to book'}

					/>
				</div>
				<div className={classes.flex}>
					<Button
						startIcon={<CancelIcon/>}
						color={'error'}
						variant={'contained'}
						onClick={(e)=>{
							window.history.back();
						}}
					>
						Cancel
					</Button>
					<Button
						variant={'contained'}
						color={'success'}
						type={'submit'}
						endIcon={<ArrowRightIcon/>}
					>
						Continue
					</Button>
				</div>
				</Paper>
			</Grid>
		</Grid>
	);
}


export default BookPlace;