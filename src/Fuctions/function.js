
export function isEmpty(obj){
	return Object.keys(obj).length === 0;
}

export const getMode = profile =>{
	const mode = {
		'driving':'drive',
		'walking':'walk',
		'cycling':'bicycle'
	};

	return mode[profile];
}