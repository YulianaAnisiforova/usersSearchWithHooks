import React, {useEffect, useState} from 'react'
import style from './Page.module.css'
import {SearchUserType} from '../types/type'
import Search from './Search'
import UsersList from './UsersList'
import UserDetails from './UserDetails'
import {DeleteOutlined} from '@ant-design/icons'
import {Button} from 'antd'

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
                <div className={style.searchBtnBox}>
                    <Search value={searchTerm} onSubmit={(value: string) => {setSearchTerm(value)}} />
                    <Button className={style.resetBtn} shape="circle" icon={<DeleteOutlined />}
                        onClick={() => {setSearchTerm(initialSearchState)}} />
                </div>
                <UsersList searchTerm={searchTerm}
                           selectedUser={selectedUser}
                           onUserSelect={(user) => {setSelectedUser(user)}}/>
            </div>
            <div>
                <UserDetails user={selectedUser} />
            </div>
        </div>
    )
}

export default Page
