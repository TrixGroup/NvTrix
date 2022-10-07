import { makeStyles } from '@mui/styles';


export const useStyles = makeStyles((theme) => ({
    container: {
        width: '100%',
        padding: theme.spacing(.5),
        marginBottom: theme.spacing(1),
        display:'flex',
        flexDirection:'column',

    },
    inputBoxes: {
        width:'100%',
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(.5)
    },
    searchHeader: {
        fontSize: '1.7em',
        fontWeight: '900',
    },
    title: {
        fontWeight: 600,
        marginLeft: theme.spacing(1),
        fontSize: '1.2em',
    },
    flex: {
        display: 'flex',
        // justifyContent:'center',
        alignItems: 'center',
        boxShadow: '0px 1px 5px rgba(0,0,0,.1)',
        borderRadius: theme.shape.borderRadius,
        border: '2px solid transparent',

    },
    trans: {
        transition: `height 1000ms ${theme.transitions.easing.easeInOut}`,

    },
    icon: {
        marginLeft: 2,
        cursor: 'pointer'
    },
    input: {
        borderRadius: theme.shape.borderRadius,
        paddingTop: theme.spacing(1),
        paddingRight: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        fontSize: '2.5em'
    },
    expandBtn: {
        width: '50px',
        height: '50px',
        transform: 'scale(.7)'
    },
    expandBtnIcon: {
        transform: `scale(1.4)`
    },
    expand: {
        padding: 0,
        display: 'flex',
        margin: 0,
        justifyContent: 'right',
        alignItems: 'center'
    },
   
}));