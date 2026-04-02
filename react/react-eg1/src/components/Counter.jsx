import { useEffect, useState } from 'react';
import './Counter.css'

function Counter({count}){



    return (
        <>
        <p>This is Counter component</p>
        <div>
            <h1>count = {count}</h1>
            {
                count > 2 ? (
                    <h2>Greater than 2</h2>
                ) : (
                    <h3>Less than or equal to 2</h3>
                )
            }
        </div>
        </>
    )
}

export default Counter