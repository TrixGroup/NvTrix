import React, { useState, useRef,useEffect  } from 'react';

import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

import APIService from '../../Service/APIService';

import { IconButton, ButtonGroup, Box ,Divider} from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

import { useStyles } from './styles';

mapboxgl.accessToken = APIService.MAP_BOX_TOKEN;


const CustomMap = (props) => {

    const { zoom = 3, center = [0, 0] } = props;

    const classes = useStyles();

    const map = useRef(null);
    const mapContainer = useRef(null);

    const [mapZoom,setMapZoom] = useState(zoom);

    useEffect(()=>{
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [0, 0], //starting positiong
            zoom: mapZoom, // starting zoom
        });
    },[]);


    const handleMapZoom = (type)=>{
        if(type==='inc'){
            map.zoomIn({duration: 1000});
        }
        else{
           map.zoomOut({duration: 1000});
        }
    }

    return (
        <div className={classes.container}>
            <div ref={mapContainer} className={classes.map}></div>
            <div className={classes.navigation_control}>
                <Box
                    sx={{
                        display: 'flex',
                        backgroundColor:'rgba(0,0,0,.1)',
                        borderRadius:2,
                        '& > *': {
                          m: 1,
                        },
                    }}
                >
                    <ButtonGroup
                        orientation="vertical"
                        aria-label="vertical outlined button group"
                    >
                    <IconButton onClick={()=>handleMapZoom('inc')}>
                        <Add style={{color:'#fff'}}/>
                    </IconButton>
                    <Divider/>
                    <IconButton onClick={()=>handleMapZoom('dec')}>
                        <Remove style={{color:'#fff'}}/>
                    </IconButton>
                    </ButtonGroup>
                </Box>
                
            </div>
        </div>
    );
};



export default CustomMap;