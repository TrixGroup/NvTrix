import React,{useState} from 'react';

import {Grid,IconButton,Box,ButtonGroup,Button} from '@mui/material';

import {SearchRounded} from '@mui/icons-material';

import Map from '../../components/Map/Map';

import AutoComplete from '../../components/AutoComplete/GeoApifyAutoComplete';

import {useStyles}from './styles'

const SearchPlace = () => {

    const classes = useStyles();
    const [location,setLocation] = useState('');
    const [center,setCenter] = useState([0,0]);

    const [openPopup,setOpenPopup] = useState(false);
    return (
        <Grid container style={{ position: "relative", height: "100%",width:'100%',backgroundColor:'red' }}>
            <Grid item xs={12} sm={12} md={12} className={classes.container}>
                <Map 
                    center={center}
                    location={location}
                />
                {
                    openPopup?(
                        <div className={classes.searchPopup}>
                            <Box className={classes.autocomplete_wrapper}>
                                <AutoComplete 
                                    icon={<SearchRounded />}
                                    value={location}
                                    style={{maxWidth:'none',width:'100%'}}
                                    placeholder={'Search'}
                                    onResult={(data)=>{
                                        console.log(data);
                                        setCenter([data.properties.lon,data.properties.lat]);
                                        setOpenPopup(false);
                                    }}
                                    onChange={(e)=>{setLocation(e.target.value);}}
                                />
                            <Button variant={'contained'} color={'secondary'} onClick={()=>setOpenPopup(false)}>Close</Button>
                            </Box>
                        </div>
                    ):null
                }
                
                <div className={classes.searchBox} style={{borderRadius:5}}>
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
                        <ButtonGroup orientation="vertical">

                        <IconButton onClick={()=>setOpenPopup(true)}>
                            <SearchRounded style={{color:'#fff',fontWeight:'900'}}/>
                        </IconButton>
                        </ButtonGroup>
                    </Box>
                </div>
            </Grid>
        </Grid>        
    );
};


export default SearchPlace;
