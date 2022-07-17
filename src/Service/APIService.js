
const HOST = 'http://localhost:8000'

class APIService{
static MAP_BOX_TOKEN = 'pk.eyJ1IjoiaXZhbnRvbSIsImEiOiJjbDJmem5nb20wY3VoM2tyenNkZ3FubTZwIn0.Tgnsvhx3FkNoBH1XIBKpxQ';
static POSITION_STACK = '2b6e5e6ef48e5c6a8ec62a0f8c48e3d3';
static TOMTOM = '92gCv4E0mDSPc5ZNrNNiejvhkx3x5wo7';
static PLATFORM = 'ykt5S9nPF3LgxA7SBr4ot8nTZEICNkbmxq8QeV8Jkp1znFR3goKo1qEPomA8eRHm2bIROgg8Pjx5sigNmRSvsw';
  static registerUser = (values) =>{
    const formValues = {
        "first_name": values.firstName,
        "last_name": values.lastName,
        "username": values.username,
        "email": values.email,
        "sex": values.sex,
        "phone": values.phoneNumber,
        "country": values.country,
        "user_type": values.userType,
        "status": 'offline',
        "password": values.password
        }
        let url =  `${HOST}/api/create_user/`;
        return fetch(url, {
            method: 'POST',
            body: JSON.stringify(formValues),
            headers: {
                "Content-Type": "application/json"
            }
            })
            .then(data=>data.json())
            .catch(err=>err);
    }
    static loginUser = (email,password)=>{
        const option={
            method:'POST',
            body:JSON.stringify({
                username:email,
                password:password
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }
        const target = HOST;
    
        let url = `${target}/api/auth/`;
        console.log(url);
        return fetch(url,option)
                .then((resp)=>resp.json())
                .catch(err=>err);
    }

    static getUserByToken = (token)=>{
        const option={
            method:'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Token ${token}`
            }
        }
        const target = HOST;
    
        let url = `${target}/api/get_current_user/`;
        console.log(url);
        return fetch(url,option)
                .then((resp)=>resp.json())
                .catch(err=>err);
    }
    static getPlaceLocation = ({token,place,limit}) =>{
        try{
            let url = `http://api.positionstack.com/v1/forward?access_key=${token}&query=${place}&limit=${limit}`;
            return fetch(url)
                    .then((resp)=>resp.json())
                    .catch(err=>err);
        }
        catch(err){
            console.log(err);
        }
    }

    static getRoute = ({profile,coords})=>{
        coords = coords.join(';');
        let url = `https://api.mapbox.com/directions/v5/mapbox/${profile}/${coords}?geometries=geojson&language=en&overview=simplified&steps=true&access_token=${this.MAP_BOX_TOKEN}`;
        return fetch(url)
                .then((resp)=>resp.json())
                .catch(err=>err);
    }
    
}

export default APIService
