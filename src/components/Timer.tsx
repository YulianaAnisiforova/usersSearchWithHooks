import React, {useEffect, useState} from 'react'
import {SearchUserType} from '../types/type'

type TimerPropsType = {
    seconds: number,
    onChange: (actualSec: number) => void,
    timerKey: SearchUserType | null,
}

const Timer: React.FC<TimerPropsType> = (props) => {
    const [seconds, setSeconds] = useState(props.seconds)

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
    }, [props.timerKey])

    return (
        <div>{seconds}</div>
    )
}

export default Timer
