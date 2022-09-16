import { Button, Dialog,DialogContent,DialogTitle, Divider, Typography ,DialogActions} from '@mui/material';
import React from 'react'
import {Cancel} from '@mui/icons-material';

function Popup(props) {
    const {title,children,openPopup,setOpenPopup,fullScreen,fullWidth,maxWidth,className,onClose} = props;
    console.log(props);
  return (
      <Dialog open={openPopup} fullScreen={fullScreen} fullWidth={fullWidth} maxWidth={maxWidth} className={className}>
          <DialogTitle>
            <Typography align='center' variant="h5" container={'h4'}>{title}</Typography>
          </DialogTitle>
          <Divider/>
          <DialogContent>
            {children}
          </DialogContent>
          <Divider/>
          <DialogActions>
          <Button 
                startIcon={<Cancel/>}
                // color={'secondary'}
                style={{color:'rgba(255,0,0,.78)'}}
                fullWidth 
                sx={{p:'10px'}}
                // variant="outlined"
                onClick={(e)=>{
                    setOpenPopup(false)
                    onClose(e);
                }}
            >close</Button>
          </DialogActions>
      </Dialog>
  )
}

export default Popup