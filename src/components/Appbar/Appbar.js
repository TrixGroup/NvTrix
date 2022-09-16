import React,{useState} from 'react';
import {AppBar,Toolbar,Avatar,Button,Typography,Badge} from '@mui/material'
import { Notifications } from '@mui/icons-material/';
import { useNavigate } from 'react-router-dom'

// import {FcAbout} from "react-icons/fc";

import { makeStyles } from '@mui/styles';

import APIService from '../../Service/APIService';

const useStyles = makeStyles((theme) => ({
	toolbar:{
		display:'flex',
		justifyContent:'space-between',
		alignItems:'center'
	},
    root:{
        width:'100%',
        height:'100%',
        // backgroundColor:theme.palette.primary.main,
        backgroundColor:'#000',
        overflowY:'scroll'
    },
    logoLg: {
        cursor:'pointer',
        display: 'none',
        [theme.breakpoints.up("sm")]: {
            display: 'block',
        },
    },
    logoSm: {
        cursor:'pointer',
        display: 'block',
        [theme.breakpoints.up("sm")]: {
            display: 'none',
        },
    },
    badge: {
        marginRight: theme.spacing(1),
        cursor:"pointer"
    },
    icons: {
        display: 'flex',
        alignItems: 'center'
    },
   })
);


const Appbar = () =>{
	const classes = useStyles();
	const navigate = useNavigate();

    const [notification,setNotificationCount] = useState(0);


	return (
		<AppBar position="fixed" style={{backgroundColor:'#000'}}>
            <Toolbar className={classes.toolbar}>
                <Typography
                    variant="h5"
                    className={classes.logoLg}
                    style={{ fontWeight: 800, cursor: 'pointer' }}
                    onClick={() => {
                        navigate('/login');
                    }}
                >{(APIService.appName())}</Typography>
                <Typography
                    variant="h6"
                    className={classes.logoSm}
                    style={{ fontWeight: 500, cursor: 'pointer' }}
                >{(APIService.appName()).toLocaleUpperCase()}</Typography>
                <div className={classes.icons}>
                    <Badge 
                        badgeContent={notification} 
                        color={'primary'} 
                        className={classes.badge}
                        onClick={()=>{
                            alert('click');
                        }}
                        >
                        <Notifications/>
                    </Badge>
                    <Button style={{ color: '#fff',fontSize:'.7em' }} size="small">About</Button>
                    <Button style={{ color: '#fff',fontSize:'.7em' }} size="small">Account</Button>
                    <Button style={{ color: '#fff',fontSize:'.7em' }} size="small">Help</Button>
                    <Avatar alt="avatar" src="" size="small"/>
                </div>
            </Toolbar>
        </AppBar>
	)
}

export default Appbar;