import React, {useEffect, useState} from 'react'
import style from './Page.module.css'
import {SearchResultType, SearchUserType} from '../types/type'
import axios from 'axios'

type UserListPropsType = {
    searchTerm: string,
    selectedUser: SearchUserType | null,
    onUserSelect: (user: SearchUserType) => void,
}

const UsersList: React.FC<UserListPropsType> = (props) => {
    const [users, setUsers] = useState<SearchUserType[]>([])

    useEffect(() => {
        axios.get<SearchResultType>(`https://api.github.com/search/users?q=${props.searchTerm}`)
            .then(response => setUsers(response.data.items))

    }, [props.searchTerm]);

    return (
        <ul>
            {users.map(u =>
                <li key={u.id}
                    className={props.selectedUser === u ? style.selected : ''}
                    onClick={() => {props.onUserSelect(u)}}>
                    {u.login}
                </li>
            )}
        </ul>
    )
}

export default UsersList