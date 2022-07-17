import React,{useEffect,useState} from 'react';
import {AppBar,Toolbar,Avatar,Button,Typography,Badge} from '@mui/material'
import { Notifications } from '@mui/icons-material/';
import { useNavigate } from 'react-router-dom'

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
	toolbar:{
		display:'flex',
		justifyContent:'space-between',
		alignItems:'center'
	},
    root:{
        width:'100%',
        height:'100%',
        backgroundColor:theme.palette.primary.main,
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
		<AppBar position="fixed">
            <Toolbar className={classes.toolbar}>
                <Typography
                    variant="h5"
                    className={classes.logoLg}
                    style={{ fontWeight: 800, cursor: 'pointer' }}
                    onClick={() => {
                        navigate('/login');
                    }}
                >Nv Trip Advisor</Typography>
                <Typography
                    variant="h6"
                    className={classes.logoSm}
                    style={{ fontWeight: 500, cursor: 'pointer' }}
                >NV TRIP</Typography>
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
                    <Button style={{ color: '#fff' }} size="small">About</Button>
                    <Button style={{ color: '#fff' }} size="small">Account</Button>
                    <Avatar alt="avatar" src="" size="small"/>
                </div>
            </Toolbar>
        </AppBar>
	)
}

export default Appbar;