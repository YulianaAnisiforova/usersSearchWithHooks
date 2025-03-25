import React, {useEffect, useState} from 'react'
import style from './Page.module.css'
import {SearchUserType, UserType} from '../types/type'
import axios from 'axios'

type UserDetailsPropsType = {
    user: SearchUserType | null,
}

const UserDetails: React.FC<UserDetailsPropsType> = (props) => {
    const [userDetails, setUserDetails] = useState<null | UserType>(null)

    useEffect(() => {
        if (props.user) {
            axios.get<UserType>(`https://api.github.com/users/${props.user.login}`)
                .then(response => setUserDetails(response.data))
        }
    }, [props.user]);

    return (
        <>
            {userDetails &&
                <div>
                    <img src={userDetails.avatar_url} alt={'avatar'} className={style.avatar}/>
                    <div>
                        <span> {userDetails.login}, </span>
                        <span> followers: {userDetails.followers} </span>
                    </div>
                </div>
            }
        </>
    )
}

export default UserDetails