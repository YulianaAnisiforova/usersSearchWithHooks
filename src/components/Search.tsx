import React, {useEffect, useState} from 'react'
import style from './Page.module.css'
import {Button, Input} from 'antd'
import { SearchOutlined } from '@ant-design/icons'

type SearchPropsType = {
    value: string,
    onSubmit: (fixedValue: string) => void,
}

const Search: React.FC<SearchPropsType> = (props) => {
    const [tempSearch, setTempSearch] = useState('')

    useEffect(() => {
        setTempSearch(props.value)
    }, [props.value]);

    return (
        <div className={style.searchBox}>
            <Input placeholder="search" value={tempSearch}
                   onChange={(e) => {
                       setTempSearch(e.currentTarget.value)
                   }}
            />
            <Button type="primary" shape="circle" icon={<SearchOutlined />}
                    className={style.searchBtn}
                    onClick={() => {props.onSubmit(tempSearch)}}/>
        </div>
    )
}

export default Search