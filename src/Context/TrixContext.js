import { useEffect, useState, createContext } from 'react';

import APIService from '../Service/APIService';

// import { CustomSnackbar } from '../components/SnackBar/'

export const TrixContext = createContext();

const initailDisplay = {
    map: true,
    instruction: false,
    trip: false
}



export const TrixProvider = ({ children }) => {
        const [pickup, setPickup] = useState('');
        const [dropoff, setDropOff] = useState('');

        const [profile, setProfile] = useState('walking');

        const [pickupCoordinates, setPickupCoordinates] = useState(null);
        const [dropoffCoordinates, setDropOffCoordinates] = useState(null);

        const [duration, setDuration] = useState();

        const [distance, setDistance] = useState();

        const [instructions, setInstructions] = useState(null);

        const [routesCoordinates, setRoutesCoordinates] = useState([]);

        const [steps, setSteps] = useState([]);

        const [numberOfPlace, setNumberOfPlace] = useState(1);

        const [price, setPrice] = useState();

        const [selectedRide, setSelectedRide] = useState([]);

        const [basePrice, setBasePrice] = useState();


        const [display, setDisplay] = useState(initailDisplay);

        const [tabValue, setTabValue] = useState('map');


        // -----------------DATA USE TO DRAW ROUTE ON THE MAP ARE FOUND HERE--------------
        
        // const [routeData,setRouteData] = useState([]);

        // const [routeStepsData,setRouteStepData] = useState({});

        // const [instructionsData,setInstructionsData] = useState({})

        // const [stepPointsData,setStepPointsData] = useState({});

        // -------------------------------------------------------------------------------

        // const createLocationCoordinatePromise = (locationName, locationType) => {
        //     return new Promise(async (resolve, reject) => {

        //         try {
        //             APIService.getPlaceLocation({
        //                 token: APIService.POSITION_STACK,
        //                 place: locationName,
        //                 limit: 1
        //             }).then((dt) => {
        //                 const { data } = dt;

        //                 if (data) {
        //                     switch (locationType) {
        //                         case 'pickup':
        //                             setPickupCoordinates([
        //                                 data[0].longitude,
        //                                 data[0].latitude
        //                             ])
        //                             break;
        //                         case 'dropoff':
        //                             setDropOffCoordinates([
        //                                 data[0].longitude,
        //                                 data[0].latitude
        //                             ])
        //                             break;
        //                         default:
        //                             break;
        //                     }
        //                     resolve();
        //                 } else {
        //                     reject();
        //                 }
        //             });



        //         } catch (error) {
        //             console.log(error);
        //             reject();
        //         }

        //     })
        // }

        // useEffect(() => {
        //     if (pickup && dropoff) {
        //         (async () => {
        //             await Promise.all([
        //                 createLocationCoordinatePromise(pickup, 'pickup'),
        //                 createLocationCoordinatePromise(dropoff, 'dropoff'),
        //             ])
        //         })()
        //     } else return
        // }, [pickup, dropoff]);


        return (
                <TrixContext.Provider 
            value = {{
                    pickup, 
                    setPickup,
                    dropoff, 
                    setDropOff,
                    pickupCoordinates, 
                    setPickupCoordinates,
                    dropoffCoordinates, 
                    setDropOffCoordinates,
                    numberOfPlace, 
                    setNumberOfPlace,
                    price,
                    setPrice,
                    selectedRide,
                    setSelectedRide,
                    duration,
                    setDuration,
                    distance,
                    setDistance,
                    profile,
                    setProfile,
                    instructions,
                    setInstructions,
                    routesCoordinates,
                    setRoutesCoordinates,
                    initailDisplay,
                    display,
                    setDisplay,
                    tabValue,
                    setTabValue,
                    steps, 
                    setSteps
                }
            }
        > 
            { children }
            
        < /TrixContext.Provider>
    );
}