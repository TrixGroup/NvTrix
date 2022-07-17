import {useState} from 'react';
import propTypes from 'prop-types';

import {Button,Snackbar,IconButton,Typography} from '@mui/material';
import {Close,SignalWifiOffOutlined} from '@mui/icons-material';

import {makeStyles} from '@mui/styles';

const useStyles = makeStyles((theme)=>({
	root:{
		borderRadius: theme.shape.borderRadius,
		padding:theme.spacing(2),
		backgroundColor:'#646464',
		display:'flex',
		alignItems:'center',
		gap:theme.spacing(.7)
	}
}))


const CustomSnackbar = (props)=>{

	const {message,open,textAction='',duration,actionFunction,icon,action=false} = props;
	const [visible,setVisible] = useState(open);

	const classes = useStyles();

	const handleClose = (event,reason)=>{
		if(reason==='clickaway'){
			return;
		}
		setVisible(false);
	}

	const Action = (
		<div className={classes.root}>
			<SignalWifiOffOutlined/>
			<Typography>{message}</Typography>
			{action && (
				<Button color={'primary'} size={'small'} onClick={actionFunction}>
					{textAction}
				</Button>
			)}
			
			<IconButton
				size="small"
				aria-label='close'
				color="inherit"
				onClick={handleClose}
			>
			<Close fontSize={'small'} />
				
			</IconButton>
		</div>
	)

	return (
		<Snackbar 
			open={visible}
			autoHideDuration={duration}
			onClose={handleClose}
		>
		{Action}
		</Snackbar>
	)
}


CustomSnackbar.propTypes = {
	icon:propTypes.node,
	action:propTypes.bool,
	message:propTypes.string.isRequired,
	open:propTypes.bool.isRequired,
	textAction:propTypes.string.isRequired,
	duration:propTypes.number.isRequired,
	actionFunction:propTypes.func
}

export default CustomSnackbar;