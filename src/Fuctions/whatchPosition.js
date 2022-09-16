
let option;
let id;

export const whatchPosition = (onSuccess,onError,stop=false) => {

  function success(pos){
    if(onSuccess){
      onSuccess(pos);
    }
    if(stop){
      navigator.geolocation.clearWatch(id)
    }
  }

  function error(err){
    if(onError){
      onError(err);
    }
  }
  const option = {
    enableHighAccuracy:true,
    timeout:5000,
    maximumAge:0
  }
  id = navigator.geolocation.whatchPosition(success,error);
}
