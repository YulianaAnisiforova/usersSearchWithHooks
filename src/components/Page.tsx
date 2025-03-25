import React, {useEffect, useState} from 'react'
import style from './Page.module.css'
import axios from 'axios'

type SearchUserType = {
    login: string,
    id: number,
}
type SearchResultType = {
    items: SearchUserType[],
}
type UserType = {
    login: string,
    id: number,
    avatar_url: string,
    followers: number,
}

const Page = () => {
    const [selectedUser, setSelectedUser] = useState<SearchUserType | null>(null)
    const [userDetails, setUserDetails] = useState<null | UserType>(null)
    const [users, setUsers] = useState<SearchUserType[]>([])
    const [tempSearch, setTempSearch] = useState('Yu')
    const [searchTerm, setSearchTerm] = useState('Yu')

    useEffect(() => {
        if (selectedUser) {
            document.title = selectedUser.login
        }
    }, [selectedUser]);

    useEffect(() => {
        axios.get<SearchResultType>(`https://api.github.com/search/users?q=${searchTerm}`)
            .then(response => setUsers(response.data.items))

    }, [searchTerm]);

    useEffect(() => {
        if (selectedUser) {
            // document.title = selectedUser.login

            axios.get<UserType>(`https://api.github.com/users/${selectedUser.login}`)
                .then(response => setUserDetails(response.data))
        }
    }, [selectedUser]);

    return (
        <div className={style.container}>

            <div>
                <div>
                    <input placeholder="search" value={tempSearch}
                           onChange={(e) => {
                               setTempSearch(e.currentTarget.value)
                           }}
                    />
                    <button onClick={() => {
                        setSearchTerm(tempSearch)
                    }}>find
                    </button>
                </div>

                <ul>
                    {users.map(u =>
                        <li key={u.id}
                            className={selectedUser === u ? style.selected : ''}
                            onClick={() => {
                                setSelectedUser(u)
                            }}>
                            {u.login}
                        </li>
                    )}
                </ul>
            </div>

            {userDetails &&
                <div>
                    <img src={userDetails.avatar_url} alt={'avatar'} className={style.avatar}/>
                    <div>
                        <span> {userDetails.login}, </span>
                        <span> number of followers: {userDetails.followers} </span>
                    </div>
                </div>
            }
        </div>
    )
}

export default Page