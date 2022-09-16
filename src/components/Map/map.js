import { useEffect, useContext, useRef, useState } from 'react';

import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

import { makeStyles } from '@mui/styles';

import { getMode } from '../../Fuctions';

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
        setSteps,
        setRoutesCoordinates
    } = useContext(TrixContext);

    const [routeData, setRouteData] = useState(null);
    const [routeStepsData, setStepsData] = useState();
    const [instructionsData, setInstructionsData] = useState();
    const [stepPointsData, setStepPointsData] = useState();

    const [pitch, setPitch] = useState(90);
    const [bearing, setBearing] = useState(45);

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
        if (map.current) {
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
            if (pickupCoordinates) {
                if (marker1.current) {
                    marker1.current.remove();
                }
                marker1.current = new mapboxgl.Marker()
                    .setLngLat(pickupCoordinates)
                    .setPopup(new mapboxgl.Popup().setText(pickup));
                marker1.current.addTo(map.current);


            }

            if (dropoffCoordinates) {
                if (marker2.current) {
                    marker2.current.remove();
                }
                marker2.current = new mapboxgl.Marker({ color: 'red' })
                    .setLngLat(dropoffCoordinates)
                    .setPopup(new mapboxgl.Popup().setText(dropoff));
                marker2.current.addTo(map.current);
            }
        }

    }, [pickup, pickupCoordinates, dropoff, dropoffCoordinates])


    const drawRoute = ({ pickupCoords, dropoffCoords }) => {
        const coords = [pickupCoords, dropoffCoords];

        APIService.getRoute({
            profile: profile,
            coords: coords
        }).then((data) => {
            // console.log({ data });
            if (data) {
                setRouteData(data);
                setDistance((data.routes[0].distance * 0.001).toFixed(2));
                setDuration((data.routes[0].duration / 60).toFixed(2));
                setSteps(data.routes[0].legs[0].steps);
                setRoutesCoordinates(data.routes[0].geometry);

            }
        }).catch(err => {
            console.log(err);
        });

        // APIService.getRouteFromGeoApify({
        //     mode:getMode(profile),
        //     coords:coords
        // }).then((data)=>{
        //     console.log({data});
        // }).catch((err)=>{
        //     console.log(err);
        // })
    }



    useEffect(() => {
        if (pickupCoordinates && dropoffCoordinates) {
            map.current.fitBounds([dropoffCoordinates, pickupCoordinates], { padding: 60 });
            drawRoute({
                pickupCoords: pickupCoordinates,
                dropoffCoords: dropoffCoordinates
            });
            setPitch(60);
        }
    }, [dropoffCoordinates, pickupCoordinates])



    return (<div ref={mapContainer} className={classes.map}></div>)
}

export default Map;