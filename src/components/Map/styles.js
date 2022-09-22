import {makeStyles} from '@mui/styles';

export const useStyles = makeStyles((theme)=>({
  map:{
    height:'100%',
    width:'100%',
    backgroundColor:'#334455',
  },
  container:{
    height:'100%',
    width:'100%',
    position:'relative',
  },
  navigation_control:{
    position:'absolute',
    right:0,
    top:0,
    bottom:0,
    margin:'auto',
    display:'flex',
    height:'100%',
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'column',
    zIndex:999,
    marginRight:theme.spacing(2),
    // backgroundColor:'rgba(0,0,0,.67)'
  }
}));
