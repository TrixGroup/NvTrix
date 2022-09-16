import { Grid, Typography, Container, Paper } from '@mui/material'
import { makeStyles } from '@mui/styles';
import React from 'react'
import { Search, WbSunny, Directions, People, DirectionsCar,Payment } from '@mui/icons-material/';
import { useNavigate } from 'react-router-dom'


import Appbar from '../../components/Appbar/Appbar';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100%',
        // backgroundColor:theme.palette.primary.main,
        backgroundColor: '#123',
        overflowY: 'scroll'
    },

    main: {
        marginTop: theme.spacing(7),
        width: '100vw',
        paddingTop: theme.spacing(1),
        position: 'relative',
        // backgroundColor:theme.palette.primary.main
    },
    items: {
        padding: '.8em',
        cursor: 'pointer',
        '&:hover': {
            transform: 'scale(1.02)',
        },
        '&:active': {
            transform: 'scale(.99)'
        },
        [theme.breakpoints.down('sm')]: {
            // transform:'scale(.7)'
        }
    },
    option: {
        padding: '2em',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        '&::selection': {
            backgroundColor: 'transparent'
        },
    },
    title: {
        fontWeight: '800',
        fontSize:'1.2em'
    }

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
        option_image: {
            fontSize: '4em',
            width: '3em',
            height: '3em',
            ':hover': {
                color: '#fff'
            }
        },
        img: {
            width: '100px',
            height: '100px'
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
                                <Typography 
                                    className={classes.title} 
                                    variant=" h5"
>Search A Place</Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} className={classes.items} onClick={()=>navigate('/book-a-place')}>
                            <Paper className={classes.option}>
                                {/*<CarCrashSharp style={styles.option_image}/>*/}
                                <DirectionsCar style={styles.option_image}/>
                                {/*<img src={BookPlaceImage} styles={styles.option_image} alt=""/>*/}
                                <Typography 
                                    className={classes.title} 
                                    variant=" h5"
>Book A Place In A Vehicle</Typography>

                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} className={classes.items} onClick={()=>navigate('/book-a-place')}>
                            <Paper className={classes.option}>
                                {/*<CarCrashSharp style={styles.option_image}/>*/}
                                <DirectionsCar style={styles.option_image}/>
                                {/*<img src={BookPlaceImage} styles={styles.option_image} alt=""/>*/}
                                <Typography 
                                    className={classes.title} 
                                    variant=" h5"
>Find Vehicles</Typography>

                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} className={classes.items}>
                            <Paper className={classes.option}>
                            <People style={styles.option_image}/>
                                <Typography 
                                    className={classes.title} 
                                    variant=" h5"
>Find Passengers</Typography>

                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} className={classes.items}>
                            <Paper className={classes.option}>
                            <WbSunny style={styles.option_image}/>
                                <Typography 
                                    className={classes.title} 
                                    variant=" h5"
>Weather</Typography>

                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} className={classes.items} onClick={()=>{
                            navigate('/trace-path');
                        }}>
                            <Paper className={classes.option}>
                                <Directions style={styles.option_image}/>
                                <Typography 
                                    className={classes.title} 
                                    variant=" h5"
  >Trace Route</Typography>

                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} className={classes.items} onClick={()=>{
                            navigate('/trace-path');
                        }}>
                            <Paper className={classes.option}>
                                <Payment style={styles.option_image}/>
                                <Typography 
                                    className={classes.title} 
                                    variant=" h5"
> But A Ticket</Typography>

                            </Paper>
                        </Grid>
                    </Grid>
                </Container>

        </Grid>
    );
}

export default Index;