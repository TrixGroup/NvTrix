import React, { useState, useEffect, useRef } from 'react';

import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

// import maplibregl from 'maplibre-gl';


import APIService from '../../Service/APIService';

import { useStyles } from './styles.js';

mapboxgl.accessToken = APIService.MAP_BOX_TOKEN;


const Map = (props) => {
    const { from = null, to = null, zoom = 14, onRouteFound } = props;
    const classes = useStyles();

    // TODO: GEOAPIFY key here
    // const GEOAPIFY_APIKEY = APIService.GEOAPIFY;
    // const MAP_BOX_TOKEN = APIService.MAP_BOX_TOKEN;

    // TODO: userPosition to store the position of the user
    // const [userPosition,setUserPosition] = useState(null);

    const map = useRef(null);
    // const mapTilerKey = 'ta6oOWFmbljwBpHaPjSm';

    const mapContainer = useRef(null);

    var marker1 = useRef(null);
    var marker2 = useRef(null);

    const popup = new mapboxgl.Popup();


    const [lng, setLng] = useState(11);
    const [lat, setLat] = useState(4);

    const [routeData, setRouteData] = useState([]);
    const [routeStepsData, setRouteStepData] = useState([]);
    const [instructionsData, setInstructionsData] = useState([]);
    const [stepPointsData, setStepPointsData] = useState([]);

    useEffect(() => {
        if (map.current) return;
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        });

        // map.current.addControl(new mapboxgl.FullscreenControl({ container: document.querySelector('body') }));
        map.current.addControl(new mapboxgl.FullscreenControl({ container: map.current }));

        // Add navigation control (the +/- zoom buttons)
        map.current.addControl(new mapboxgl.NavigationControl({ visualizePitch: true }), "bottom-right");

    });

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((coords) => {
            setLat(coords.coords.latitude);
            setLng(coords.coords.longitude);
            console.log(coords);
            if (map.current) {
                map.current.flyTo({ center: [lng, lat], zoom: 14 });
                const mkr = new mapboxgl.Marker()
                    .setLngLat([coords.coords.longitude, coords.coords.latitude]);
                mkr.addTo(map.current);
            }

        }, (err) => {
            console.log(err);
        })
    }, []);

    useEffect(() => {
        console.log(from, to);
        if (from) {
            marker1.current = new mapboxgl.Marker({ color: 'green' })
                .setLngLat([from.properties.lon, from.properties.lat])
                .setPopup(new mapboxgl.Popup().setText(from.properties.formatted));
            marker1.current.addTo(map.current);
        }
        if (to) {
            marker2.current = new mapboxgl.Marker({ color: 'red' })
                .setLngLat([to.properties.lon, to.properties.lat])
                .setPopup(new mapboxgl.Popup().setText(to.properties.formatted));
            marker2.current.addTo(map.current);
        }

        if (from && to) {
            const coords = [
                [from.properties.lon, from.properties.lat],
                [to.properties.lon, to.properties.lat]
            ];


            let routeData_;
            let routeStepsData_;
            let instructionsData_;
            let stepPointsData_;

            APIService.getRouteFromGeoApify({
                    mode: 'drive', //'hike'
                    coords: coords
                })
                .then(data => {
                    console.log('Route Data : ', data);
                    setRouteData(data);

                    onRouteFound(data);

                    var routeDatInfo = data;

                    const steps = [];
                    const instructions = [];
                    const stepPoints = [];

                    routeDatInfo.features[0].properties.legs.forEach((leg, legIndex) => {
                        const legGeometry = routeDatInfo.features[0].geometry.coordinates[legIndex];
                        leg.steps.forEach((step, index) => {
                            if (step.instruction) {
                                instructions.push({
                                    "type": "Feature",
                                    "geometry": {
                                        "type": "Point",
                                        "coordinates": legGeometry[step.from_index]
                                    },
                                    properties: {
                                        text: step.instruction.text
                                    }
                                });
                            }

                            if (index !== 0) {
                                stepPoints.push({
                                    "type": "Feature",
                                    "geometry": {
                                        "type": "Point",
                                        "coordinates": legGeometry[step.from_index]
                                    },
                                    properties: step
                                })
                            }

                            if (step.from_index === step.to_index) {
                                // destination point
                                return;
                            }

                            const stepGeometry = legGeometry.slice(step.from_index, step.to_index + 1);
                            steps.push({
                                "type": "Feature",
                                "geometry": {
                                    "type": "LineString",
                                    "coordinates": stepGeometry
                                },
                                properties: step
                            });

                        })
                    });

                    routeStepsData_ = {
                        type: "FeatureCollection",
                        features: steps
                    }

                    setRouteStepData(routeStepsData_);

                    instructionsData_ = {
                        type: "FeatureCollection",
                        features: instructions
                    }

                    setInstructionsData(instructionsData_);


                    stepPointsData_ = {
                        type: "FeatureCollection",
                        features: stepPoints
                    }

                    setStepPointsData(stepPointsData_);

                    map.current.addSource('route', {
                        type: 'geojson',
                        data: routeData
                    });

                    map.current.addSource('points', {
                        type: 'geojson',
                        data: instructionsData
                    });

                    addLayerEvents();
                    drawRoute();

                })
                .catch(err => {
                    console.log(err);
                });






        }
    }, [from, to]);

    function drawRoute() {
        if (!routeData) {
            return;
        }

        if (map.current.getLayer('route-layer')) {
            map.current.removeLayer('route-layer')
        }

        if (map.current.getLayer('points-layer')) {
            map.current.removeLayer('points-layer')
        }

        if (document.getElementById("showDetails").checked) {
            map.current.getSource('route').setData(routeStepsData);
            map.current.addLayer({
                'id': 'route-layer',
                'type': 'line',
                'source': 'route',
                'layout': {
                    'line-join': "round",
                    'line-cap': "round"
                },
                'paint': {
                    'line-color': [
                        'match',
                        ['get', 'road_class'],
                        'motorway',
                        '#009933',
                        'trunk',
                        '#00cc99',
                        'primary',
                        '#009999',
                        'secondary',
                        '#00ccff',
                        'tertiary',
                        '#9999ff',
                        'residential',
                        '#9933ff',
                        'service_other',
                        '#ffcc66',
                        'unclassified',
                        '#666699',
                        /* other */
                        '#666699'
                    ],
                    'line-width': 8
                }
            });

            // map.current.getSource('points').setData(stepPointsData);
            map.current.addLayer({
                'id': 'points-layer',
                'type': 'circle',
                'source': 'points',
                'paint': {
                    'circle-radius': 4,
                    'circle-color': "#ddd",
                    'circle-stroke-color': "#aaa",
                    'circle-stroke-width': 1,
                }
            });
        } else {
            map.current.getSource('route').setData(routeData);
            map.current.addLayer({
                'id': 'route-layer',
                'type': 'line',
                'source': 'route',
                'layout': {
                    'line-cap': "round",
                    'line-join': "round"
                },
                'paint': {
                    'line-color': "#6084eb",
                    'line-width': 8
                },
                'filter': ['==', '$type', 'LineString']
            });

            map.current.getSource('points').setData(instructionsData);
            map.current.addLayer({
                'id': 'points-layer',
                'type': 'circle',
                'source': 'points',
                'paint': {
                    'circle-radius': 4,
                    'circle-color': "#fff",
                    'circle-stroke-color': "#aaa",
                    'circle-stroke-width': 1,
                }
            });
        }
    }

    function addLayerEvents() {
        map.current.on('mouseenter', 'route-layer', () => {
            map.current.getCanvas().style.cursor = 'pointer';
        });

        map.current.on('mouseleave', 'route-layer', () => {
            map.current.getCanvas().style.cursor = '';
        });

        map.current.on('mouseenter', 'points-layer', () => {
            map.current.getCanvas().style.cursor = 'pointer';
        });

        map.current.on('mouseleave', 'points-layer', () => {
            map.current.getCanvas().style.cursor = '';
        });

        map.current.on('click', 'route-layer', (e) => {
            if (document.getElementById("showDetails").checked) {
                const stepData = e.features[0].properties;
                const propertiesToShow = ["surface", "elevation", "elevation_gain"];
                const dataToShow = {};
                propertiesToShow.forEach(property => {
                    if (stepData[property] || stepData[property] === 0) {
                        dataToShow[property] = stepData[property];
                    }
                });

                showPopup(dataToShow, e.lngLat);
            } else {
                showPopup({
                    distance: `${e.features[0].properties.distance} m`,
                    time: `${e.features[0].properties.time} s`
                }, e.lngLat);
            }
            e.preventDefault();
        })

        map.curve.on('click', 'points-layer', (e) => {
            const properties = e.features[0].properties;
            const point = e.features[0].geometry.coordinates;

            if (properties.text) {
                popup.setText(properties.text);
                popup.setLngLat(point);
                popup.addTo(map);
                e.preventDefault();
            }
        });
    }

    function showPopup(data, lngLat) {
        let popupHtml = Object.keys(data).map(key => {
            return `<div class="popup-property-container">
              <span class="popup-property-label">${key}: </span>
              <span class="popup-property-value">${data[key]}</span>
            </div>`
        }).join('');

        popup.setLngLat(lngLat).setHTML(popupHtml).addTo(map.current);
    }

    return ( <>
        <input id="showDetails" type="checkbox" onClick={drawRoute} /> 
        <div ref = { mapContainer } className = { classes.map } > < /div> 
        </>
    );
}

export default Map;