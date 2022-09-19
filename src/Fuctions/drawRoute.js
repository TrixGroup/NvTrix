import APIService from '../Service/APIService';

import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

export function convertLatLngListToLngLat(coords) {
    let li = [];

    coords.map((c) => {
        li.push([c[1], c[0]]);
    });

    return li;
}

export const drawRouteFromGeoApify = (pickupCoordinates, dropoffCoordinates, map, mode = 'drive') => {
    const coords = [
        pickupCoordinates, dropoffCoordinates
    ]

    let routeData;
    let routeStepsData;
    let instructionsData;
    let stepPointsData;

    const popup = new mapboxgl.Popup();

    APIService.getRouteFromGeoApify({
        mode: mode,
        coords: coords
    }).then((routeResult) => {
        routeData = routeResult;

        const steps = [];
        const instructions = [];
        const stepPoints = [];

        routeData.features[0].properties.legs.forEach((leg, legIndex) => {

            const legGeometry = routeData.features[0].geometry.coordinates[legIndex];

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
            });
        });

        routeStepsData = {
            type: "FeatureCollection",
            features: steps
        }

        instructionsData = {
            type: "FeatureCollection",
            features: instructions
        }

        stepPointsData = {
            type: "FeatureCollection",
            features: stepPoints
        }

        if (map.getSource('route')) {
            map.removeLayer('route');
            map.removeSource('route');
        }

        map.addSource('route', {
            type: 'geojson',
            data: routeData
        });
        if (map.getSource('points')) {
            map.removeSource('points');
        }
        map.addSource('points', {
            type: 'geojson',
            data: instructionsData
        });

        map.getStyle().layers.map((layer) => {
            // console.log('Layer Id : ',layer);
            console.table(layer);
        });

        addLayerEvents();
        drawRoute();


        map.on('load', () => {
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
        });


    }).catch(err => console.log(err))

    function drawRoute() {
        if (!routeData) {
            return;
        }


        if (map.getLayer('route-layer')) {
            map.removeLayer('route-layer')
            if (map.getSource('route')) {
                map.removeSource('route');
            }
        }

        if (map.getLayer('points-layer')) {
            map.removeLayer('points-layer')
            if (map.getSource('points')) {
                map.removeLayer('points-layer');
            }
        }

        map.getSource('route').setData(routeData);
        map.addLayer({
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

        map.getSource('points').setData(instructionsData);
        map.addLayer({
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

    function addLayerEvents() {
        map.on('mouseenter', 'route-layer', () => {
            map.getCanvas().style.cursor = 'pointer';
        });

        map.on('mouseleave', 'route-layer', () => {
            map.getCanvas().style.cursor = '';
        });

        map.on('mouseenter', 'points-layer', () => {
            map.getCanvas().style.cursor = 'pointer';
        });

        map.on('mouseleave', 'points-layer', () => {
            map.getCanvas().style.cursor = '';
        });

        map.on('click', 'route-layer', (e) => {

            showPopup({
                distance: `${e.features[0].properties.distance} m`,
                time: `${e.features[0].properties.time} s`
            }, e.lngLat);

            e.preventDefault();
        })

        map.on('click', 'points-layer', (e) => {
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
                        <span class="popup-property-label" style='color:#000'>${key}: </span>
              <span class="popup-property-value"  style='color:#000'sss>${data[key]}</span>
            </div>`
        }).join('');

        popup.setLngLat(lngLat).setHTML(popupHtml).addTo(map);
    }
}