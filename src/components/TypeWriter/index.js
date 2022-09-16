import {useRef,useEffect} from 'react';

const TypeWriter = (props) => {
    const { text = '', speed = 50 } = props;
    let i = 0;
    let timerId;
    const wrt = useRef(null);

    useEffect(() => {
    	wrt.current.innerHTML = '';
        timerId = setInterval(() => {
            wrt.current.innerHTML += text.charAt(i);
            i++;
            if (i === text.length) {
                clearInterval(timerId);

            }
        }, speed)
        return ()=>{
            clearInterval(timerId);
        }
    },[text,speed]);


    return (<div ref={wrt}></div>)
}
export default TypeWriter;