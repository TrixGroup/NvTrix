import React, { useState, useEffect,useRef } from 'react';
import { InputBase } from '@mui/material';
import { Search } from '@mui/icons-material';
import APIService from '../../Service/APIService';

import { useStyles } from './styles';

const initail = []

const AutoComplete = (props) => {
	const { placeholder, icon, onResult,style } = props;
	const [showSearch, setShowSearch] = useState(false);

	const inputElement = useRef(null);

	const classes = useStyles();
	const [place, setPlace] = useState('');
	const [old, setOld] = useState('');
	const [result, setResult] = useState(initail);

	const handleInput = (e) => {
		setPlace(e.target.value);
		setOld('');
		let place = e.target.value;
		if (place.length >= 3) {
			if(e.keyCode === 13){
				console.log('enter');
				fetchPlace(place);
			}
			try {

				APIService.getPlaceLocation({
					token: APIService.POSITION_STACK,
					place: place,
					limit: 5
				})
					.then(data => {
						setResult(data.data);
						setShowSearch(true);
					
					})
					.catch(err => console.log(err));
			}
			catch (err) {
				console.log(err);
			}

		}
		else {
			setShowSearch(false);
			setShowSearch(false);
		}
	}
	const handleClick = (data) => {
		setPlace(data.label);
		if (onResult) {
			onResult(data);
		}
		setShowSearch(false);
	}

	const fetchPlace = (place) =>{
		APIService.getPlaceLocation({
			token: APIService.POSITION_STACK,
			place: place,
			limit: 1
		})
		.then((data)=>{
			if(onResult){
				setShowSearch(false);
				console.log(data.data[0]);
				onResult(data.data[0]);
			}
		})
		.catch(err=>console.log(err));
	}

	useEffect(() => {
		document.addEventListener('click', () => {
			setShowSearch(false);
		})
		return (
			document.removeEventListener('click', (e) => { })
		)
	});

	return (
		<div className={classes.wrapper} style={style}>
			<div className={classes.searchInput}>
				<div className={classes.search}>
					{icon ? (icon) : (<Search className={classes.icon} />)}
					<InputBase
						ref={inputElement}
						required={true} 
						fullWidth 
						sx={{ ml: 1, flex: 1 }} 
						value={(old) ? (old) : (place)} 
						onChange={handleInput} 
						type="text" 
						className={classes.input} 
						placeholder={placeholder}
						onKeyDown={(e)=>{
							console.log('The Event : ',e);
							if(e.keyCode === 13){
								fetchPlace(place);
							}
						}}
						onBlur={()=>{
							if(place.length >=3){
								fetchPlace(place);
							}
							// console.log('blur',inputElement.current);
						}}
					/>
				</div>
				{showSearch && (
					<div className={classes.autoCompleteBox}>
						{result?.map((dt, i) => (
							<div key={i} className={classes.li}
								onMouseEnter={() => {
									setOld(dt.label);
								}}
								onMouseLeave={() => {
									setOld('');
								}}
								onClick={() => {
									handleClick(dt)
								}}>
								<p align={'left'}>{dt.name}</p>
								<small align={'right'} style={{ fontSize: '.6em' }}>{dt.label}</small>
							</div>
						))
						}
						<span 
							style={{
								width:'100%',
								fontSize:".7em",
								marginTop:0,
								textAlign:"right",
								float:'right',
								paddingRight:'.4em'
							}}
						>Powered by &copy;ivantom</span>

					</div>
				)}
			</div>
		</div>
	);
}

export default AutoComplete;