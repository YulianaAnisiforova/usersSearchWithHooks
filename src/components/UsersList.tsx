import React, {useEffect, useState} from 'react'
import style from './Page.module.css'
import {SearchResultType, SearchUserType} from '../types/type'
import axios from 'axios'
import {List, Pagination} from 'antd'

type UserListPropsType = {
    searchTerm: string,
    selectedUser: SearchUserType | null,
    onUserSelect: (user: SearchUserType) => void,
}

const UsersList: React.FC<UserListPropsType> = (props) => {
    const [users, setUsers] = useState<SearchUserType[]>([])
    const [total_count, set_total_count] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 20

    const getUsers = (currentPage: number) => {
        axios.get<SearchResultType>(`https://api.github.com/search/users?q=${props.searchTerm}&page=${currentPage}`+
        `&per_page=${pageSize}`)
            .then(response => {
                setUsers(response.data.items)
                set_total_count(response.data.total_count)
            })
    }

    useEffect(() => {
        getUsers(currentPage)

    }, [props.searchTerm, currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
        getUsers(page)
    }

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
            <br/>

            <Pagination current={currentPage}
                        pageSize={pageSize}
                        showSizeChanger={false}
                        onChange={handlePageChange}
                        total={total_count}
            />
        </div>
    )
}

export default UsersList