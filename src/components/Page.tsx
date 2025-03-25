import React, {useEffect, useState} from 'react'
import style from './Page.module.css'
import {SearchUserType} from '../types/type'
import Search from './Search'
import UsersList from './UsersList'
import UserDetails from './UserDetails'

const Page = () => {
    const [selectedUser, setSelectedUser] =
        useState<SearchUserType | null>(null)
    const initialSearchState: string = 'Yuliana'
    const [searchTerm, setSearchTerm] = useState(initialSearchState)

    useEffect(() => {
        if (selectedUser) {
            document.title = selectedUser.login
        }
    }, [selectedUser]);

    return (
        <div className={style.container}>
            <div>
                <Search value={searchTerm} onSubmit={(value: string) => {setSearchTerm(value)}} />
                <button onClick={() => {setSearchTerm(initialSearchState)}}>reset</button>
                <UsersList searchTerm={searchTerm}
                           selectedUser={selectedUser}
                           onUserSelect={(user) => {setSelectedUser(user)}}/>
            </div>
            <UserDetails user={selectedUser} />
        </div>
    )
}

export default Page
