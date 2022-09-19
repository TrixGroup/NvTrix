import React from 'react';

import {Grid} from '@mui/material';

import Map from '../../components/Map/Map';


const SearchPlace = () => {
    return (
        <Grid container style={{ position: "relative", height: "100%",width:'100%',backgroundColor:'red' }}>
            <Grid item xs={12} sm={12} md={12}>
                <Map />
            </Grid>
        </Grid>        
    );
};


export default SearchPlace;
