import React from 'react'

import {TextField,FormControl,InputLabel,Select,MenuItem,IconButton} from '@mui/material';


import Eye from '@mui/icons-material/RemoveRedEyeOutlined';
import Eye1 from '@mui/icons-material/RemoveRedEye';

function MuiInput(props) {
    const {inputType,menuItems,label,errorMessage,value,onChange,...inputProps} = props;
    console.log(menuItems,label);



    return (
    <>
        {(inputType==='input')?(
            <>
            <TextField
            variant='outlined'
            color='primary'
            onChange={onChange}
            label={label}
            {...inputProps}
            required
            
            >
            </TextField>
            {/* <span>{errorMessage}</span> */}

            </>
        ):(
            <FormControl style={props.style}>
                <InputLabel>{label}</InputLabel>
                <Select
                {...inputProps}
                onChange={onChange}
                variant='outlined'
                label={label}
                required
                style={{ fontSize: '1em' }}
                >
                     {/* <MenuItem value={''} selected></MenuItem> */}

                    {menuItems?.map((data,index)=>{
                        return <MenuItem value={data.name}>{data.name}</MenuItem>
                    })}
                </Select>
            </FormControl>
        )}
    </>
  )
}

export default MuiInput;