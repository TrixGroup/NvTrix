import React, { useState, useRef, useEffect } from 'react';

import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

import APIService from '../../Service/APIService';
import { mapStyle } from '../../Service/mapStyle';

import { IconButton, ButtonGroup, Box, Divider } from '@mui/material';
import { AddRounded, RemoveRounded, NearMeRounded } from '@mui/icons-material';

import { useStyles } from './styles';

mapboxgl.accessToken = APIService.MAP_BOX_TOKEN;

function add3DBuild(map) {
    // Insert the layer beneath any symbol layer.
    const layers = map.getStyle().layers;
    const labelLayerId = layers.find(
        (layer) => layer.type === 'symbol' && layer.layout['text-field']
    ).id;

    // The 'building' layer in the Mapbox Streets
    // vector tileset contains building height data
    // from OpenStreetMap.
    map.addLayer({
            'id': 'add-3d-buildings',
            'source': 'composite',
            'source-layer': 'building',
            'filter': ['==', 'extrude', 'true'],
            'type': 'fill-extrusion',
            'minzoom': 15,
            'paint': {
                'fill-extrusion-color': '#aaa',

                // Use an 'interpolate' expression to
                // add a smooth transition effect to
                // the buildings as the user zooms in.
                'fill-extrusion-height': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    15,
                    0,
                    15.05,
                    ['get', 'height']
                ],
                'fill-extrusion-base': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    15,
                    0,
                    15.05,
                    ['get', 'min_height']
                ],
                'fill-extrusion-opacity': 0.6
            }
        },
        labelLayerId
    );
}


const CustomMap = (props) => {

    const { zoom = 3, center = [0, 0], style = mapStyle.navigation_dark } = props;

    const classes = useStyles();

    const [_style, setStyle] = useState(style);

    const map = useRef(null);
    const mapContainer = useRef(null);


    useEffect(() => {
        if (map.current) return;
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            // style: 'mapbox://styles/mapbox/streets-v11',
            style: _style,
            center: center, //starting positiong
            zoom: zoom, // starting zoom
        });
    }, []);

    useEffect(() => {
        if (map.current) {
            map.current.setStyle(style);
        }
    }, [style]);


    useEffect(() => {
        if (navigator.geolocation) {

            function success({ coords }) {
                console.log({ coords });
                if (map.current) {
                    console.log(coords.longitude);
                    map.current.on('load', () => {
                        if (map.current.isStyleLoaded()) {
                            map.current.flyTo({
                                center: [coords.longitude, coords.latitude],
                                essential: true,
                                speed: 0.2,
                                zoom: 10
                            });
                            map.current.setZoom(10);
                            map.current.setCenter([coords.longitude, coords.latitude]);

                            add3DBuild(map.current);
                        }

                    });
                }
            }

            function error(err) {
                console.log(err);
            }

            navigator.geolocation.getCurrentPosition(success, error);
        }
    }, [])



    console.log(style);

    const handleMapZoom = (type) => {
        if (map.current) {
            if (type === 'inc') {
                map.current.zoomIn({ duration: 1000 });
            } else {
                map.current.zoomOut({ duration: 1000 });
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