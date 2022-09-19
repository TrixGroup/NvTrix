import React,{useState,useRef}  from 'react';

import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

import APIService from '../../Service/APIService';

import {ToggleButton,ToggleButtonGroup} from '@mui/material';

import {useStyles} from './styles';

mapboxgl.accessToken = APIService.MAP_BOX_TOKEN;


const CustomMap = (props) => {

    const {zoom=3,center=[0,0]} = props;

    const classes = useStyles();

    const map = useRef(null);
    const mapContainer = useRef(null);

    return (
        <div className={classes.container}>
            <div ref={mapContainer} className={classes.map}></div>
            <div>
            </div>
        </div>
    );
};



export default CustomMap;
