import React, { useEffect, useState } from 'react'

const Timer = ({ counter, timeOut, setCounter }) => {


    const startTimer = () => {
        let timer = setInterval(() => {
            setCounter((time) => {
                if (time <= 0) {
                    return 0;
                } else {
                    return time - 1
                };
            });
        }, 1000);
    }
    useEffect(() => {
        if (counter <= 0)
            timeOut()
    }, [counter])
    useEffect(() => {
        startTimer()
    }, [])



    return (<>
        {counter > 0 ? <p style={{ color: 'white' }}>{counter}</p> : <></>}
    </>
    )
}

export default Timer;