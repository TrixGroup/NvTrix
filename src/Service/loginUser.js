

export const loginUser = (email,password)=>{
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
    const target = ' http://localhost:8000';

    let url = `${target}/api/auth/`;
    console.log(url);
    return fetch(url,option)
            .then((resp)=>resp.json())
            .catch(err=>err);
}
