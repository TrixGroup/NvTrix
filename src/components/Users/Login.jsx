import React, { useEffect, useState } from 'react'
import {Link,IconButton, Button, FormControl, InputLabel, TextField, OutlinedInput, Typography, Grid, InputAdornment, Alert } from '@mui/material';

import { VisibilityOff, Visibility, DirectionsCarFilledTwoTone } from '@mui/icons-material/';

import {useNavigate} from 'react-router-dom';

// importe our login function from the api service folder

import {loginUser} from '../../Service/loginUser';
import Popup from '../Popup/Popup';
import APIService from '../../Service/APIService';

const initailValues = {
    email: '',
    password: '',
    showPassword: false
}

const Spinner = ()=>{
    return (
        <div 
            className="spinner"
            style={{
                width:'30px',
                height:'30px',
                borderRadius:'50%',
                border:'3px solid rgba(255,255,255,.2)',
                borderTopColor:'#fff'
            }}>
        </div>
    )
}

const initialUser = {
        id:null,
        username:'',
        first_name:'',
        last_name:'',
        country:'',
        sex:'',
        user_type:'',
        phone:'',
        email:''
    }

function Login() {

    const [values, setValues] = useState(initailValues);
    const [error,setError] = useState(false);
    const [login,setLogin] = useState(false);
    const [rotate,setRotate] = useState(false);
    const [pointerEvent,setPointerEvent] = useState(true);
    const [user,setUser] = useState(initialUser);

    let navigate = useNavigate();

    useEffect(()=>{
        const user = sessionStorage.getItem('user');
        const token = sessionStorage.getItem('token');
        if(user && token){
            console.log('user login : ',user);
            // navigate('/user');
        }
        else{
            console.log('not login');
        }
    },[]);

    const year = new Date().getFullYear();


    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleSubmit = (e)=>{
        e.preventDefault();
        setRotate(true);
        setPointerEvent(false);
        loginUser(values.email,values.password)
        .then(data=>{
            console.log(data);
            if(data['token']){
               
                setTimeout(() => {
                    setRotate(false)
                    setError(false);
                    setLogin(true);
                    setOpenPopup(true);
                    setPointerEvent(true);
                    sessionStorage.setItem('token',data['token']);
                    APIService.getUserByToken(data['token'])
                    .then(data=>{
                        console.log(data['user']);
                        const u = data['user'];
                        console.log('id : ',u.id)
                        setUser({...user,...u});
                        sessionStorage.setItem('user',JSON.stringify(u));
                        navigate('/user');                                                                                                                                                                                                                                                                                                                                                                                              sessionStorage.setItem('user',JSON.stringify                                                (u));                   
                        // setUser({...user,id:u.id,username:u.username});
                        // console.log('kk : ',u.username);
                    })
                }, 1000);
            }
            else{
                
                setTimeout(() => {
                    setError(true);
                setLogin(false);
                    setRotate(false)
                    setPointerEvent(true);
                }, 1000);
            }
        })
        
    }

    console.log('The user is : ',user);

    const handleChange = (e)=>{
        setValues({...values,[e.target.name]:e.target.value});
    }
    const x = { width: '100%', height: '100%' }

    const [openPopup,setOpenPopup] = useState(false);

    const Display = ({user})=>{
        return (
            <div style={{textAlign:'center',alignContent:'center',wordWrap:'break-word'}}>
                <h4>Welcome {user.username} how are you today ?</h4>
            </div>
        );
    }
    
    return (
        <Grid container justifyContent={'center'} alignItems={'center'} style={x}>
            <Popup
                openPopup={openPopup}
                setOpenPopup = {setOpenPopup}
                title={'Login Successfull'}
            >
                <Display user={user}/>
            </Popup>
            <form
                method='post'
                style={{
                    padding: 9, 
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    maxWidth: 500,
                    flexDirection: 'column',
                    boxShadow: '0 0 3px 5px #ddd',
                    borderRadius: '2%',
                    border: '1px solid transparent'
                }}
                onSubmit={handleSubmit}
            >
                <Grid item xs={12} style={{ padding: 8 }} justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
                   <div style={{margin:7,display:'flex',justifyContent:'center','alignItems':'center',flexDirection:'column'}}>
                   <Typography variant="h4">Login</Typography>
                   <DirectionsCarFilledTwoTone  style={{fontSize:'6em'}}/>
                   </div>
                   
                   {error && (
                    <Alert 
                        variant="outlined"
                        severity="error" 
                        style={{marginBottom:8,padding:8}}>
                        Email or password incorrect
                    </Alert>)}
                    {login && (
                    <Alert 
                        variant="outlined"
                        style={{marginBottom:8,padding:8}}>
                        Login Successfully
                    </Alert>)}
                    <TextField
                        variant="outlined"
                        placeholder="email"
                        label="email"
                        type="email"
                        name="email"
                        fullWidth
                        value={values.email}
                        onChange={handleChange}
                        style={{marginBottom:10}}
                        required
                    />
                    <FormControl
                        variant="outlined"
                        fullWidth
                    >
                        <InputLabel>Password</InputLabel>
                        <OutlinedInput
                            name="password"
                            label="Password"
                            type={values.showPassword ? "text":'password'}
                            required={true}
                            onChange={handleChange}
                            value={values.password}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        //   onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <Button
                        type="submit"
                        variant="contained"
                        className={pointerEvent?('all'):('none')}
                        style={{marginTop:10,padding:8,marginBottom:4,fontWeight:800}} 
                        fullWidth
                    >
                        {rotate?(<Spinner/>):("Login")}
                    </Button>
                    <Typography align={'center'}>Don't Have an account ? <Link href="register">Register</Link></Typography>
                    <Typography align={'center'}>&copy;{year}</Typography>
                </Grid>
            </form>
        </Grid>
    );
}

export default Login;