import { useEffect, useContext, useRef, useState } from 'react';

import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

import { makeStyles } from '@mui/styles';

import { getMode, convertLatLngListToLngLat, drawRouteFromGeoApify } from '../../Fuctions';

import APIService from '../../Service/APIService';

import { TrixContext } from '../../Context/TrixContext';

const useStyles = makeStyles((theme) => ({
    map: {
        width: '100%',
        height: '100%',
        background: '#334455'
    },
}));

mapboxgl.accessToken = APIService.MAP_BOX_TOKEN;

const Map = () => {

    const classes = useStyles();

    const mapContainer = useRef(null);
    const map = useRef(null);

    const marker1 = useRef(null);
    const marker2 = useRef(null);

    const {
        pickup,
        dropoff,
        pickupCoordinates,
        dropoffCoordinates,
        profile,
        setDistance,
        setDuration,
        setRoutesCoordinates,
        instructions,
        setInstructions
    } = useContext(TrixContext);

    const [pitch, setPitch] = useState(30);
    const [bearing, setBearing] = useState(0);

    useEffect(() => {
        if (map.current) return;
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [0, 0], //starting positiong
            zoom: 5, // starting zoom
            pitch: pitch, //start picth in degrees
            bearing: bearing, //starting bearing in degree
        });

        // Add navigation control (the +/- zoom buttons)
        map.current.addControl(new mapboxgl.NavigationControl({ visualizePitch: true }), "bottom-right");
    }, []);

    useEffect(() => {

        if (pickup === '') {
                if (marker1.current) {
                    marker1.current.remove();
                }
            }
            if (dropoff === '') {
                if (marker2.current) {
                    marker2.current.remove();
                }
            }
    },[pickup,dropoff])

    useEffect(() => {
        if (map.current) {
            if (pickupCoordinates) {
                if (marker1.current) {
                    marker1.current.remove();
                }
                marker1.current = new mapboxgl.Marker()
                    .setLngLat([pickupCoordinates[1], pickupCoordinates[0]])
                    .setPopup(new mapboxgl.Popup().setText(pickup));
                marker1.current.addTo(map.current);

                map.current.flyTo({
                    center: [pickupCoordinates[1], pickupCoordinates[0]],
                    essential: true,
                    speed: 0.2,
                })

            }

            if (dropoffCoordinates) {
                if (marker2.current) {
                    marker2.current.remove();
                }
                marker2.current = new mapboxgl.Marker({ color: 'red' })
                    .setLngLat([dropoffCoordinates[1], dropoffCoordinates[0]])
                    .setPopup(new mapboxgl.Popup().setText(dropoff));
                marker2.current.addTo(map.current);

                map.current.flyTo({
                    center: [dropoffCoordinates[1], dropoffCoordinates[0]],
                    essential: true,
                    speed: 0.2,
                })
            }
        }

    }, [pickup, pickupCoordinates, dropoff, dropoffCoordinates])

    useEffect(() => {
        if (pickupCoordinates && dropoffCoordinates) {
            drawRouteFromGeoApify(pickupCoordinates, dropoffCoordinates, map.current, getMode(profile));
            
            
            map.current.fitBounds([
                [dropoffCoordinates[1],dropoffCoordinates[0]], 
                [pickupCoordinates[1],pickupCoordinates[0]]], { padding: 60 });

        }
    }, [pickup,dropoff,dropoffCoordinates, pickupCoordinates,profile])

    return (<div ref={mapContainer} className={classes.map}></div>)
}

export default Map;