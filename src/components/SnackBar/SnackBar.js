import React,{useState} from 'react';
import {Snackbar,Alert} from '@mui/material';
import propTypes from 'prop-types';


const TypeSnackbar = (props) =>{

	const {
		message,
		open,
		severity,
		duration
	} = props;

	const [visible,setVisible] = useState(open);

	const handleClose = (event,reason)=>{
		if(reason === 'clickaway'){
			return;
		}
		setVisible(false);
	}

	return (
		<div>
			<Snackbar open={visible} autoHideDuration={duration} onClose={handleClose}>
			  <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
			    {message}
			  </Alert>
			</Snackbar>
		</div>
	)

}

TypeSnackbar.propTypes = {
	message:propTypes.string.isRequired,
	open:propTypes.bool.isRequired,
	severity:propTypes.oneOf(['success','error','warning','info']).isRequired,
	duration:propTypes.number.isRequired,
}

export default TypeSnackbar;