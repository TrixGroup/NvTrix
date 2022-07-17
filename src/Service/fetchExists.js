export async function fetchExist(column,value){
    const resp = await fetch(`http://localhost:8000/api/${column}/${value}`);
    const dt = await resp.json();
    if(resp.statusText === 'OK' && resp.status === 200){
        return dt;
    }
}