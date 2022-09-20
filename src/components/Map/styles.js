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
    zIndex:999,
  }
}));
