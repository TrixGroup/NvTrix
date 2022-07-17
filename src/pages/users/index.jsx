import { Grid,Typography, Container, Paper } from '@mui/material'
import { makeStyles } from '@mui/styles';
import React from 'react'
import { Search,WbSunny,Directions,People,DirectionsCar} from '@mui/icons-material/';
import { useNavigate } from 'react-router-dom'


import Appbar from '../../components/Appbar/Appbar';


const useStyles = makeStyles((theme) => ({
    root:{
        width:'100%',
        height:'100%',
        backgroundColor:theme.palette.primary.main,
        overflowY:'scroll'
    },
    
    main:{
        marginTop:theme.spacing(7),
        width:'100vw',
        paddingTop:theme.spacing(1),
        position:'relative',
        // backgroundColor:theme.palette.primary.main
    },
    items:{
        padding:'.8em',
        cursor:'pointer',
        '&:hover':{
            transform:'scale(1.02)'
        },
        '&:active':{
            transform:'scale(.99)'
        },
    },
    option:{
        padding:'2em',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'column',
        '&::selection':{
            backgroundColor:'transparent'

        }
    },
    
}))

function Index() {

    const styles = {
        root: {
            width: '100%',
            height: '100%'
        },
        toolbar: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        options: {
            padding: 10
        },
        icons: {
            display: 'flex',
            alignItems: 'center'
        },
        option_image:{
            fontSize:'4em',
            width:'3em',
            height:'3em'
        },
        img:{
            width:'100px',
            height:'100px'
        }
        
    }

    const navigate = useNavigate();

    const classes = useStyles();

    return (
        <Grid container style={styles.root} className={classes.root}>
            <Appbar/>

                <Container className={classes.main}>
                    <Grid container  alignItems={'center'}>
                        <Grid item xs={12} sm={6} md={4} className={classes.items}

                            onClick={()=>{
                                navigate('/search');
                            }}

                            >
                            <Paper className={classes.option}>
                                <Search style={styles.option_image}/>
                                {/*<img src={Image} styles={styles.option_image} alt="" />*/}
                                <Typography>Search A Place</Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} className={classes.items} onClick={()=>navigate('/book-a-place')}>
                            <Paper className={classes.option}>
                                {/*<CarCrashSharp style={styles.option_image}/>*/}
                                <DirectionsCar style={styles.option_image}/>
                                {/*<img src={BookPlaceImage} styles={styles.option_image} alt=""/>*/}
                                <Typography>Book A Place In A Vehicle</Typography>

                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} className={classes.items}>
                            <Paper className={classes.option}>
                            <People style={styles.option_image}/>
                                <Typography>Find Passengers</Typography>

                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} className={classes.items}>
                            <Paper className={classes.option}>
                            <WbSunny style={styles.option_image}/>
                                <Typography>Weather</Typography>

                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} className={classes.items} onClick={()=>{
                            navigate('/find-path');
                        }}>
                            <Paper className={classes.option}>
                                <Directions style={styles.option_image}/>
                                <Typography>Find Route Between Two Place</Typography>

                            </Paper>
                        </Grid>
                    </Grid>
                </Container>

        </Grid>
    );
}

export default Index;