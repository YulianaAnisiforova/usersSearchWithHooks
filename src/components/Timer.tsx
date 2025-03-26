import React, {useEffect, useState} from 'react'

type TimerPropsType = {
    seconds: number,
    onChange: (actualSec: number) => void,
}

const Timer: React.FC<TimerPropsType> = (props) => {
    const startTimerSec = 10
    const [seconds, setSeconds] = useState(startTimerSec)

    useEffect(() => {
        setSeconds(props.seconds)
    }, [props.seconds]);

    useEffect(() => {
        props.onChange(seconds)
    }, [seconds]);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds((prev) => prev - 1)
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div>{seconds}</div>
    )
}

export default Timer
