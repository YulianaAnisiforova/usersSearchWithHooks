import React, {useEffect, useState} from 'react'
import style from './Page.module.css'
import {SearchResultType, SearchUserType} from '../types/type'
import axios from 'axios'
import {List} from 'antd'

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
        <div className={style.list}>
            <List
                size="small"
                bordered
                dataSource={users}
                renderItem={(u: any) => <List.Item className={props.selectedUser === u ? style.selected : style.users}
                                                   onClick={() => {props.onUserSelect(u)}}>
                                            {u.login}
                                        </List.Item>}
            />
        </div>
    )
}

export default UsersList