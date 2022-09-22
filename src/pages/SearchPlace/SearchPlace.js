import React from 'react';

import {Grid,IconButton,Box,ButtonGroup} from '@mui/material';

import {SearchRounded} from '@mui/icons-material';

import Map from '../../components/Map/Map';

import {useStyles}from './styles'

const SearchPlace = () => {

    const classes = useStyles();
    return (
        <Grid container style={{ position: "relative", height: "100%",width:'100%',backgroundColor:'red' }}>
            <Grid item xs={12} sm={12} md={12} className={classes.container}>
                <Map />
                <div className={classes.searchBox} style={{borderRadius:5}}>
                    <Box 
                        sx={{
                            display: 'flex',
                            '& > *': {
                              m: .3,
                            },
                          }}
                    >
                        <ButtonGroup>

                        <IconButton>
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
