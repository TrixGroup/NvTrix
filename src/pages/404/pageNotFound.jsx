import React from 'react';
import {Container, Grid, Typography,Button} from '@mui/material';
import { red } from '@mui/material/colors';
import {ArrowBack} from '@mui/icons-material/';
import {useNavigate} from 'react-router-dom';

function PageNotFound() {
  const navigate = useNavigate();
  return (
      <Grid container style={{width:'100%',height:'100%'}} justifyContent={'center'} flexDirection={'column'} alignItems={"center"}>
          <Container style={{display:'flex',justifyContent:'center',alignItem:'center'}}>
              <Typography variant="h3" color={red[900]}>Sorry The Page You Requested is Not Found</Typography>
          </Container>
          <Button
            variant="contained"
            onClick={()=>{
              navigate('/user');
            }}
            startIcon={<ArrowBack/>}
          >
              Back
          </Button>
      </Grid>
  )
}

export default PageNotFound;