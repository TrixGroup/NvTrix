import React,{useRef,useState,useEffect} from 'react';

import { makeStyles } from '@mui/styles';

import APIService from '../../Service/APIService';

import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax


mapboxgl.accessToken = APIService.MAP_BOX_TOKEN;

const useStyles = makeStyles((theme) => ({
	map:{
    	width:'100%',
    	height:'100%',
        backgroundColor:theme.palette.primary.main,
        // backgroundColor:'red',
    },
}));

const MapBoxGlMap = (props) => {
	const classes = useStyles();

	const {origin,destination,routesCoordinates,onRouteDraw} = props;

	const [userPosition,setUserPosition] = useState({});

	const mapContainer = useRef(null);
  	const map = useRef(null);
  	const [lng, setLng] = useState(11);
  	const [lat, setLat] = useState(4);
  	const [zoom, setZoom] = useState(11);


  	const addRoutes = (coords)=>{
  		if(map.current){
  			if(map.current.getSource('route')){
  				map.current.removeLayer('route');
  				map.current.removeSource('route');
  			}
  			else{
  				const {coordinates} = coords;
  				console.log(coordinates);

  				if(coordinates){
					map.current.flyTo({
						center:[origin.longitude,origin.latitude],
						essential: true,
			        	speed: 0.2,
					});

					new mapboxgl.Marker({color: "#0000FF"})
					  .setLngLat([origin.longitude,origin.latitude])
					  .addTo(map.current);

					new mapboxgl.Marker({color: "#FF0000"})
					  .setLngLat([destination.longitude,destination.latitude])
					  .addTo(map.current);

					 map.current.addSource('route', {
		                'type': 'geojson',
		                'data': {
		                    'type': 'Feature',
		                    'properties': {},
		                    'geometry': {
		                        'type': 'LineString',
		                        'coordinates': coordinates
		                    }
		                }
		            });

		            map.current.addLayer({
		                'id': 'route',
		                'type': 'line',
		                'source': 'route',
		                'layout': {
		                    'line-join': 'round',
		                    'line-cap': 'round'
		                },
		                'paint': {
		                    'line-color': '#1db7dd',
		                    'line-width': 8,
		                    "line-opacity": 0.8

		                }
		            });

		            onRouteDraw(!true);
  				}
  				
  			}
  		}
  	}



  	// useEffect(()=>{
  	// 	fetch('https://ipapi/.co/json')
  	// 	.then(res=>res.json())
  	// 	.then((data)=>{
  	// 		console.log('User Location : ',{data});
  	// 	})
  	// 	.catch((err)=>console.error(err))
  	// },[]);

  	useEffect(() => {
	    if (map.current) return; // initialize map only once
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


		map.current.addControl(new mapboxgl.GeolocateControl({
		    positionOptions: {
		        enableHighAccuracy: true
		    },
		    trackUserLocation: true,
		    showUserHeading: true
		}),'bottom-right');

	});
		
	useEffect(()=>{
		
	},[origin,destination]);

	useEffect(() => {
	    if (!map.current) return; // wait for map to initialize
	    map.current.on('move', () => {
	      setLng(map.current.getCenter().lng.toFixed(4));
	      setLat(map.current.getCenter().lat.toFixed(4));
	      setZoom(map.current.getZoom().toFixed(2));
	    });
	});

	// useEffect(()=>{
	// 	if(navigator.geolocation){
	// 		setInterval(()=>{
	// 			// console.log('Hello');
	// 			navigator.geolocation.getCurrentPosition(function(position){
	// 				setUserPosition(position);
	// 				// console.log(position.coords);

	// 			},function(err){
	// 				// console.log(err);
	// 			});
	// 		},2000);
	// 	}
	// },[])

	useEffect(()=>{

	},[origin,destination,setUserPosition]);

	useEffect(()=>{
  		console.log('Current  : ',map.current);
  		console.log('Routes : ',routesCoordinates);
  		// if(map.current){
	  	// 	map.current.on('style.load', function() {
	  			
	  	// 	});
  		// }
  		console.log(map.current.isStyleLoaded(),map.current.loaded());
  		if(map.current)
  		{
	  	const waiting = () => {
		    if (!map.current.isStyleLoaded() || !map.current.loaded()) 
		    {
		      setTimeout(waiting, 200);
		    } 
		    else {
		    	console.log('Pending....');
		      addRoutes(routesCoordinates);
		    }
	  	};
	  	waiting();

  		}
  	},[routesCoordinates])

  	return (<div ref={mapContainer} className={classes.map}></div>);
}

export default MapBoxGlMap;