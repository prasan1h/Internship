import React, { useEffect } from 'react'
import { useState } from 'react';
import Counter from './Counter';

const CountBtn = () => {
    let [counter, setCounter] = useState(0);
    useEffect(() => {
      console.log("value :", counter);
    },[counter])

  return (
    <>
    <Counter counter= {counter}/>
    <button onClick={ () => setCounter(counter + 1)}>Count +1</button>

    </>
  )
}

export default CountBtn