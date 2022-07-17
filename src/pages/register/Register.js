import React, { useState,useEffect} from 'react'
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import Input from '../../components/inputs/input';

import { inputs } from './inputs';

import { fetchData } from '../../data/fetchData';

import './style.css';


function Register() {

    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        phoneNumber: '',
        sex: '',
        country: '',
        userType: '',
        password: '',
        confirmPassword: ''
    });


    function onChange(e) {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    

    useEffect(()=>{
        fetchData()
        .then(dt => {
            // console.log(dt)
            setValues({ ...values, country: dt })
            inputs[6]['menuItems'] = dt;
            console.log(inputs)
    });
    },[]);


    const year = new Date().getFullYear();
    const left = inputs.filter((data)=>{return data.id <= 6});
    const right = inputs.filter((data)=>{return data.id > 6});
    console.log(left);


    const centerDiv = { display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' };
    const gridItemStyle = {display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}
    return (
        <div className='xx' style={{ ...centerDiv, height: '100%',width:'100%', marginBottom: 5,overflow:'auto',position:'absolute',left:0}}>
            <Paper className='yy' style={{ ...centerDiv, maxWidth: '600px', width: '100%'}} >
                <h1 align="center">Sign Up</h1>

                <Grid container justifyContent="space-evenly" alignItems="center">
                    <Grid item xs={12} md={6} style={gridItemStyle}>
                        {left.map((dt, id) => (
                                <Input style={{marginBottom: 4, width: '90%' }} onChange={onChange} menuItems={values[dt.name]} value={values[dt.name]} key={id} {...dt} />
                            )
                        )}
                    </Grid>

                    <Grid item xs={12} md={6} style={gridItemStyle}>
                        {right.map((dt, id) =>(
                                <Input style={{ marginBottom: 4, width: '90%' }} onChange={onChange} menuItems={values[dt.name]} value={values[dt.name]} key={id} {...dt} />
                            )
                        )}
                        <Button
                    variant="contained"
                    style={{ marginBottom: 4, width: '90%', paddingTop: 8 }}
                >Sign Up</Button>
                <p align="center">&copy; 2021-{year}<br />Powered By ivantom</p>
                  <p align="center" class="mt-0"></p>
                    </Grid>
                </Grid>
                
            </Paper>

        </div>


        
    )
}

export default Register;