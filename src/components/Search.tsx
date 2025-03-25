import React, {useEffect, useState} from 'react'

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
        <div>
            <input placeholder="search" value={tempSearch}
                   onChange={(e) => {
                       setTempSearch(e.currentTarget.value)
                   }}
            />
            <button onClick={() => {props.onSubmit(tempSearch)}}>
                find
            </button>
        </div>
    )
}

export default Search