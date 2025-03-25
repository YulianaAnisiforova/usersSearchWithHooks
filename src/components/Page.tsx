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

const Page = () => {
    const [selectedUser, setSelectedUser] = useState<SearchUserType | null>(null)
    const [users, setUsers] = useState<SearchUserType[]>([])
    const [tempSearch, setTempSearch] = useState('')

    useEffect(() => {
        if (selectedUser) {
            document.title = selectedUser.login
        }
    }, [selectedUser]);

    const fetchData = (term: string) => {
        axios.get<SearchResultType>(`https://api.github.com/search/users?q=${term}`)
            .then(response => setUsers(response.data.items))
    }

    useEffect(() => {
        fetchData('it-kamasutra')

    }, []);

    return (
        <div className={style.container}>

            <div>
                <div>
                    <input placeholder="search" value={tempSearch}
                           onChange={(e) => {setTempSearch(e.currentTarget.value)}}
                    />
                    <button onClick={() => {
                        fetchData(tempSearch)
                    }} >find</button>
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

            <div>
                <h2>Username</h2>
                <div>Details</div>
            </div>
        </div>
    )
}

export default Page