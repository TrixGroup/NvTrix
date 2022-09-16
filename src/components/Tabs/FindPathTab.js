import {useContext} from 'react';

import {TrixContext} from '../../Context/TrixContext';

import  {Tabs, Tab, Box} from '@mui/material';

import {AssistantDirection,TripOrigin} from '@mui/icons-material';

import MapIcon from '@mui/icons-material/Map';

const FindPathTab = () => {

	const {setDisplay,tabValue,setTabValue} = useContext(TrixContext);
    return (
        <Box sx={{w:'100%'}}>
			<Tabs 
				variant="fullWidth" 
				value={tabValue} 
				onChange={(event,value)=>setTabValue(value)}
				textColor="inherit"
				indicatorColor="primary"
			>
				<Tab 
					size={'small'} 
					icon={<TripOrigin/>}  
					value="trip" 
					label="Trip"
					onClick={(e)=>{
						setDisplay({
							map:false,
								instruction:false,
								trip:true
						})
						setTabValue('trip');
					}}
				/>
				<Tab 
					size={'small'} 
					icon={<MapIcon/>}  
					value="map" 
					label="Map"
					onClick={(e)=>{
						setDisplay({
							map:true,
								instruction:false,
								trip:false
						})
						setTabValue('map');
					}}
				/>
				<Tab 
					size={'small'} 
					icon={<AssistantDirection/>}  
					value="instructions" 
					label="Intructions"
					onClick={(e)=>{
						setDisplay({
							map:false,
							instruction:true,
							trip:false
						});
						setTabValue('instructions');
					}}
				/>

			</Tabs>
		</Box>
    );
}

export default FindPathTab;