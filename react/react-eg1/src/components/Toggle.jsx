import React, { useState } from 'react'

const Toggle = () => {

    let [val, setVal] = useState(false);
    let [a, setA] = useState("hide");
    

  return (

    <>
    <button onClick={() => {setVal( val = true)}}>show</button>
    <button onClick={() => {setVal( val = false)}}>hide</button>
    <div>
        {
            (val && (
                <p>Hello, the content is showing now</p>
            ))
        }
    </div>
    <br />
    <button onClick={() => {a == "hide" ? setA(a = "show") : setA(a = "hide")}}>{a}</button>
    <div>
        {
            (a !="show" && (
                <p>this is toogle button</p>
            ))
        }
    </div>
    </>
  )
}

export default Toggle