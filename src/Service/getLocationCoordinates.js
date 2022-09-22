
import APIService from './APIService';

const token = APIService.POSITION_STACK;

const getLocationCoordinates = async (req,res) =>{
	const url = `http://api.positionstack.com/v1/forward?access_key=${token}&query=${req.body.place}&limit=1`;
	try{
		const response = await fetch(url);

		const data = await response.json();

		res.status(200).send({message:'success',data:data.data});
	}catch(error){
		res.status(500).send({message:'error',error:error.message});
	}
}

export default getLocationCoordinates;