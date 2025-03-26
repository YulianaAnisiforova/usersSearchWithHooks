import React, {useEffect, useState} from 'react'
import style from './Page.module.css'
import {SearchUserType, UserType} from '../types/type'
import axios from 'axios'
import Timer from './Timer'

type UserDetailsPropsType = {
    user: SearchUserType | null,
    onDisappear: (newUser: SearchUserType | null) => void,
}

const UserDetails: React.FC<UserDetailsPropsType> = (props) => {
    const startTimerSec = 5
    const [userDetails, setUserDetails] = useState<null | UserType>(null)
    const [seconds, setSeconds] = useState(startTimerSec)
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        if (props.user) {
            axios.get<UserType>(`https://api.github.com/users/${props.user.login}`)
                .then(response => {
                    setSeconds(startTimerSec)
                    setUserDetails(response.data)
                    setIsOpen(true)
                })
        }
    }, [props.user]);

    useEffect(() => {
        if (seconds < 1) {
            setUserDetails(null)
            props.onDisappear(null)
        }
    }, [seconds]);

    useEffect(() => {
        if (!isOpen) {
            setUserDetails(null)
            props.onDisappear(null)
        }
    }, [isOpen]);

    return (
        <div className={style.detailsBox}>
            {userDetails &&
                <div>
                    <Timer seconds={seconds} timerKey={props.user} onClose={(bool: boolean) => setIsOpen(bool)}
                           onChange={(actualSec) => {setSeconds(actualSec)}} />

                    <h2>{userDetails.login}</h2>
                    <img src={userDetails.avatar_url} alt={'avatar'} className={style.avatar}/>
                    <div className={style.details}>
                        <div> name: {userDetails.name} </div>
                        <div> bio: {userDetails.bio} </div>
                        <span> following: {userDetails.following}, </span>
                        <span> followers: {userDetails.followers} </span>
                        <div> company: {userDetails.company} </div>
                        <div> at GitHub since: {userDetails.created_at} </div>
                        <div> last update: {userDetails.updated_at} </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default UserDetails