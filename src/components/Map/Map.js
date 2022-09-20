import React, { useState, useRef } from 'react';

import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

import APIService from '../../Service/APIService';

import { IconButton, ButtonGroup, Box } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

import { useStyles } from './styles';

mapboxgl.accessToken = APIService.MAP_BOX_TOKEN;


const CustomMap = (props) => {

    const { zoom = 3, center = [0, 0] } = props;

    const classes = useStyles();

    const map = useRef(null);
    const mapContainer = useRef(null);

    return (
        <div className={classes.container}>
            <div ref={mapContainer} className={classes.map}></div>
            <div>
                <Box
                    sx={{
                        display: 'flex',
                        '& > *': {
                          m: 1,
                        },
                    }}
                >
                    <ButtonGroup
                        orientation="vertical"
                        aria-label="vertical outlined button group"
                    >
                    <IconButton>
                        <Add />
                    </IconButton>
                    <IconButton>
                        <Remove/>
                    </IconButton>
                    </ButtonGroup>
                </Box>
                
            </div>
        </div>
    );
};



export default CustomMap;