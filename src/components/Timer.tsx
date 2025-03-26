import React, {useEffect, useState} from 'react'
import style from './Page.module.css'
import {SearchUserType} from '../types/type'
import {Button} from 'antd'

type TimerPropsType = {
    seconds: number,
    onChange: (actualSec: number) => void,
    timerKey: SearchUserType | null,
    onClose: (bool: boolean) => void,
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
        <div className={style.timerBox}>

        <Button className={style.timer} shape="circle" onClick={() => {props.onClose(false)}}>
            {seconds}
        </Button>
        </div>
    )
}

export default Timer
