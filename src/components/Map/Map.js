import React, { useState, useRef,useEffect  } from 'react';

import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

import APIService from '../../Service/APIService';
import {mapStyle} from '../../Service/mapStyle';

import { IconButton, ButtonGroup, Box ,Divider} from '@mui/material';
import { AddRounded, RemoveRounded,NearMeRounded } from '@mui/icons-material';

import { useStyles } from './styles';

mapboxgl.accessToken = APIService.MAP_BOX_TOKEN;


const CustomMap = (props) => {

    const { zoom = 3, center = [0, 0] ,style=mapStyle.navigation_dark} = props;

    const classes = useStyles();

    const [_style,setStyle] = useState(style);

    const map = useRef(null);
    const mapContainer = useRef(null);


    useEffect(()=>{
        if(map.current)  return;
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            // style: 'mapbox://styles/mapbox/streets-v11',
            style:_style,
            center: [0, 0], //starting positiong
            zoom: zoom, // starting zoom
        });
    },[]);

    useEffect(()=>{
        if(map.current){
            map.current.setStyle(style);
        }
    },[style]);

    console.log(style);

    const handleMapZoom = (type)=>{
        if(map.current){
            if(type==='inc'){
            map.current.zoomIn({duration: 1000});
        }
        else{
           map.current.zoomOut({duration: 1000});
        }
        }
        
    }

    return (
        <div className={classes.container}>
            <div ref={mapContainer} className={classes.map}></div>
            <div className={classes.navigation_control}>
                <Box
                    sx={{
                        display: 'flex',
                        backgroundColor:'rgba(0,0,0,.5)',
                        borderRadius:2,
                        '& > *': {
                          m: .5,
                        },
                        'mb':2, 
                    }}
                >
                <ButtonGroup
                        orientation="vertical"
                    >
                    <IconButton>
                        <NearMeRounded style={{color:'#fff',}}/>
                    </IconButton>
                </ButtonGroup>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        backgroundColor:'rgba(0,0,0,.5)',
                        borderRadius:2,
                        '& > *': {
                          m: .5,
                        },
                    }}
                >
                    <ButtonGroup
                        orientation="vertical"
                        aria-label="vertical outlined button group"
                    >
                    <IconButton onClick={()=>handleMapZoom('inc')}>
                        <AddRounded style={{color:'#fff'}}/>
                    </IconButton>
                    <Divider/>
                    <IconButton onClick={()=>handleMapZoom('dec')}>
                        <RemoveRounded style={{color:'#fff'}}/>
                    </IconButton>
                    </ButtonGroup>
                </Box>
                
            </div>
        </div>
    );
};



export default CustomMap;