import React, { useState, useEffect } from 'react';

import { Link, Typography, Grid, TextField,Button, Select, MenuItem, FormControl, OutlinedInput, InputLabel, IconButton, FormHelperText, InputAdornment } from '@mui/material';

import { VisibilityOff, Visibility, Person } from '@mui/icons-material/';

import { fetchData } from '../../data/fetchData';

import { fetchExist } from '../../Service/fetchExists';

import APIService from '../../Service/APIService';

const initialValues = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phoneNumber: '',
    sex: '',
    country: '',
    userType: '',
    password: '',
    confirmPassword: '',
    showPassword: false
}

const initialValid = {
    firstName: true,
    lastName: true,
    username: true,
    email: true,
    phoneNumber: true,
    sex: true,
    country: true,
    userType: true,
    password: true,
    confirmPassword: true,
}


const initailErrors = {
    firstName: 'First name if require !',
    lastName: "Last name if require !",
    username: "Required. 6-150 characters. Letters, digits and @/./+/-/_ only.",
    email: "Email doesnot match name@server.domain !",
    phoneNumber: '',
    sex: 'Gender Required',
    country: '',
    userType: '',
    password: '',
    confirmPassword: '',
}

function Register() {
    const [values, setValues] = useState(initialValues);
    const [valid, setValid] = useState(initialValid);
    const [errors, setErrors] = useState(initailErrors);
    const [countries, setCountries] = useState([]);

    const year = new Date().getFullYear();

    useEffect(() => {
        async function getData() {
            setCountries(await fetchData());
        }
        getData();
    }, []);


    const getName = (e) => {
        return e.target.name;
    }

    const handleValidation = (e) => {
        if (getName(e) === 'email') {
            handleEmailValidation(e);
        }
        else if (getName(e) === 'sex' || getName(e) === 'userType' || getName(e) === 'country') {
            handleSelectValidation(e);
        }
        else if (getName(e) === 'password') {
            handlePasswordValidation(e);
        }
        else if (getName(e) === 'confirmPassword') {
            handlePasswordValidation(e);
        }
        else {
            var reg;
            reg = new RegExp("^(\\w|\\s|\\W|\\S|\\d)+$");
            if (getName(e) === "username") {
                // @/./+/-/_
                // setErrors(initailErrors)
                reg = new RegExp("^((\\w+)(@|\\.|\\+|-|_)?){6,150}$");
                // console.log(reg,e.target.value,reg.test(e.target.value))
            }
            setValid({ ...valid, [e.target.name]: reg.test(e.target.value) });
            handleChange(e);
        }


    };

    const handleEmailValidation = (e) => {
        const reg = new RegExp("^([A-Za-z0-9-\\.]+)@([A-Za-z0-9-]+)\\.([A-Za-z]+){2,5}$");
        console.log(reg, reg.test(e.target.value))
        setValid({ ...valid, [e.target.name]: reg.test(e.target.value) });
        handleChange(e);
    }

    const handleSelectValidation = (e) => {
        const reg = new RegExp("^null$");
        setValid({ ...valid, [e.target.name]: !reg.test(e.target.value) });
        handleChange(e);
    }

    const handlePasswordValidation = (e) => {
        const reg = new RegExp("^(([\\w]+)(|!|;|&|@|\\?|#|^|\\~)+){8,64}$");
        setValid({ ...valid, [e.target.name]: reg.test(e.target.value) });
        handleChange(e);
    }

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    function handleChange(e) {
        setValues({ ...values, [e.target.name]: e.target.value });
    }



    async function handleSubmit(e) {
        e.preventDefault();
        
        var error = null;

        const username = await fetchExist('check_user', values.username);
        if (username['exists'] === true) {
            setValid({ ...valid, username: false });
            setErrors({ ...errors, username: 'Username already taken !' });
            // console.log('1');
            error = true;
            // return;
        }

        const email = await fetchExist('check_email', values.email);
        console.log('Email : ', email);
        if (email['exists'] === true) {
            setValid({ ...valid, email: false });
            setErrors({ ...errors, email: 'Email already exists !' });
            error = true;
            // console.log('2');

        }

        if (values.firstName === '') {
            setValid({ ...valid, firstName: false });
            setErrors({ ...errors, firstName: 'First Name require !' });
            error = true;
            // console.log('3');

        }
        else if (values.lastName === '') {
            setValid({ ...valid, lastName: false });
            setErrors({ ...errors, lastName: 'Last name require !' });
            error = true;
            // console.log('4');
            // return;
        }
        else if (values.username === '') {
            setValid({ ...valid, username: false });
            setErrors({ ...errors, username: 'username require !' });
            error = true;
            // console.log('5');
            // return;

        }
        const reg = new RegExp("^([A-Za-z0-9-\\.]+)@([A-Za-z0-9-]+)\\.([A-Za-z]+){2,5}$");
        if (!reg.test(values.email)) {
            setValid({ ...valid, email: reg.test(values) });
            setErrors({ ...errors, email: 'invalid email !' });
            error = true;
        }
        const phone = await fetchExist('check_phone', values.phoneNumber);
        console.log({ phone });
        if (phone['exists'] === true) {
            setValid({ ...valid, phoneNumber: false });
            setErrors({ ...errors, phoneNumber: 'Phone Number already exists !' });
            error = true;
            // console.log('6');
        }

        else if (values.sex === 'null') {
            setValid({ ...valid, sex: false });
            setErrors({ ...errors, sex: 'Gender require !' });
            error = true;
            // console.log('6');

        }

        else if (values.password !== values.confirmPassword) {
            setValid({ ...valid, confirmPasssword: false });
            setErrors({ ...errors, confirmPasssword: 'Password don\'t match !' });
            error = true;
            // console.log('7');
            // return;
        }
        console.log('error : ' + error);


        if (error === null) {
            console.log('User created ');

            APIService.registerUser(values)
            .then(data=>console.log(data));
        }

    }

    const x = { width: '100%', height: '100%' }

    return (
        <Grid container justifyContent={'center'} alignItems={'center'} style={x}>

            <form
                onSubmit={handleSubmit}
                method="post"
                style={{
                    padding: 9, width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    maxWidth: 800,
                    flexDirection: 'column',
                    boxShadow: '0 0 3px 5px #ddd',
                    borderRadius: '5',
                    border: '1px solid transparent'
                }}
            >
                <div>
                    <Typography variant="h4">Sign Up</Typography>
                    <center>
                        <Person style={{ fontSize: '5em' }} />

                    </center>
                </div>
                <Grid container width={'100%'}>
                    <Grid item xs={12} md={6} style={{ padding: 8 }} justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
                        <TextField
                            variant='outlined'
                            label="First Name"
                            name="firstName"
                            style={{ marginBottom: 4 }}
                            value={values.firstName}
                            onChange={handleValidation}
                            onInput={handleValidation}
                            fullWidth
                            required={true}
                            error={!valid.firstName}
                            helperText={!valid.firstName ? (errors.firstName) : null}
                        />
                        <TextField
                            variant='outlined'
                            label="Last Name"
                            name="lastName"
                            style={{ marginBottom: 4 }}
                            value={values.lastName}
                            onChange={handleValidation}
                            onInput={handleValidation}
                            fullWidth
                            required
                            error={!valid.lastName}
                            helperText={!valid.lastName ? (errors.lastName) : null}
                        />
                        <TextField
                            variant='outlined'
                            label="Email"
                            name="email"
                            style={{ marginBottom: 4 }}
                            value={values.email}
                            onChange={handleValidation}
                            fullWidth
                            required
                            error={!valid.email}
                            helperText={!valid.email ? (errors.email) : ''}
                        // error={values.lastName === ''}
                        // helperText={values.lastName === "" ? "Email Require!" : ""}
                        />

                        <FormControl error={!valid.sex}
                            style={{ marginBottom: 4 }}
                            fullWidth>
                            <InputLabel>Gender</InputLabel>
                            <Select
                                fullWidth
                                name="sex"
                                label="Gender"
                                defaultValue='null'
                                value={values.sex}
                                onChange={handleValidation}
                                error={!valid.sex}
                                required
                            >
                                <MenuItem value='null'>Select Your Gender</MenuItem>
                                <MenuItem value='F'>Female</MenuItem>
                                <MenuItem value='M'>Male</MenuItem>

                            </Select>
                            {!valid.sex ? (
                                <FormHelperText>{errors.sex}</FormHelperText>
                            ) : null}
                        </FormControl>
                        <TextField
                            variant='outlined'
                            label="UserName"
                            name="username"
                            value={values.username}
                            style={{ marginBottom: 4 }}
                            onChange={handleValidation}
                            fullWidth
                            required={true}
                            error={!valid.username}
                            helperText={!valid.username ? (errors.username) : null}
                        />
                        <TextField
                            variant='outlined'
                            label="Phone Number"
                            name="phoneNumber"
                            value={values.phoneNumber}
                            style={{ marginBottom: 4 }}
                            onChange={handleValidation}
                            fullWidth
                            type='tel'
                            required={true}
                            error={!valid.phoneNumber}
                            helperText={!valid.phoneNumber ? (errors.phoneNumber) : null}


                        />

                    </Grid>
                    <Grid item xs={12} md={6} style={{ padding: 8 }} justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
                        <FormControl
                            style={{ marginBottom: 4 }}
                            fullWidth
                            error={!valid.country}
                        >
                            <InputLabel>Country</InputLabel>
                            <Select
                                fullWidth
                                label="Country"
                                name="country"
                                required={true}
                                defaultValue='null'
                                value={values.country}
                                onChange={handleValidation}
                            >
                                <MenuItem key='null' value='null'>Select Your Country</MenuItem>


                                {countries?.map((country, i) => (
                                    <MenuItem key={i} value={country.name} >{country.name}</MenuItem>
                                ))}
                            </Select>
                            {!valid.country ? (
                                <FormHelperText>Country Require !</FormHelperText>
                            ) : null}
                        </FormControl>
                        <FormControl
                            error={!valid.userType}
                            style={{ marginBottom: 4 }}
                            fullWidth>
                            <InputLabel>Profile</InputLabel>
                            <Select
                                fullWidth
                                defaultValue=''
                                name="userType"
                                label="Profile"
                                value={values.userType}
                                onChange={handleValidation}
                                required={true}
                            >
                                <MenuItem value=''>Select Your Profile</MenuItem>
                                <MenuItem value='PASSENGER'>Passenger</MenuItem>
                                <MenuItem value='DRIVER'>Driver</MenuItem>

                            </Select>
                            {!valid.userType ? (
                                <FormHelperText>Profile Required</FormHelperText>
                            ) : null}
                        </FormControl>
                        <FormControl variant="outlined"
                            style={{ marginBottom: 4 }}
                            error={!valid.password}
                            fullWidth>
                            <InputLabel>Password</InputLabel>
                            <OutlinedInput
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.password}
                                onChange={handleValidation}
                                name="password"
                                label="Password"
                                required={true}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                        >
                                            {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            <FormHelperText>{!valid.password ? "Password Length must be between 8 and 64 characters an must contain \na !" : ""}</FormHelperText>
                        </FormControl>
                        <FormControl variant="outlined"
                            style={{ marginBottom: 4 }}
                            error={!valid.confirmPassword}
                            fullWidth>
                            <InputLabel>Confirm Password</InputLabel>
                            <OutlinedInput
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.confirmPassword}
                                onChange={handleValidation}
                                name="confirmPassword"
                                label="Confirm Password"
                                required={true}
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
                            <FormHelperText>{(values.password !== values.confirmPassword && valid.confirmPassword) ? "Confirm Password Don't Match!" : ""}</FormHelperText>
                        </FormControl>
                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            style={{ padding: 12 }}
                        >Register</Button>
                        <Typography align={'center'}>Already Have an account ? <Link href="login">login</Link></Typography>
                        <Typography align={'center'}>&copy;{year}</Typography>
                    </Grid>
                </Grid>

            </form>
        </Grid>
    )
}

export default Register;