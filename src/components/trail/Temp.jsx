import { useState } from 'react';
import Trial from './Trial';
import { useEffect } from 'react';

const Temp = () => {
    const[num, setNum] = useState(3);

    useEffect(()=>{
        console.log(num)
    },[num])
    
    function increment() {
        console.log("incr")
        setNum(prev=>prev+1)
    }
    function decrement() {
        console.log("decr")
        setNum(prev=>prev-1)
    }

    return <Trial num={num} increment={increment} decrement={decrement} />
};

export default Temp