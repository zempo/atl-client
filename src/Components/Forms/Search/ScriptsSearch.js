import React, {useContext, useRef, useState} from 'react'
import { useInput } from '../../../Hooks/use-input';
import MagGlass from '../../../Images/mGlass.svg.png'

export const ScriptsSearch = () => {
    const { value: keyword, bind: bindKeyword, reset: resetKeyword } = useInput("");
    const [sortDirection, setSortDirection] = useState('desc') 

    const handleKeywordSearch = async e => {
        e.preventDefault()

        console.log(keyword)
        resetKeyword()
    }
    const handleSort = async e => {
        e.preventDefault()
        let sortBy = e.target.value
        console.log(sortBy) 
    }
    const toggleSortDirection = e => {
        e.preventDefault()
        if (sortDirection === 'desc') {
            setSortDirection('asc')
        } else {
            setSortDirection('desc')
        }
    }
    return (
        <>
        <form className="atl-form search-form">
            <input type="text" name="keyword" placeholder="Search Your Scripts" {...bindKeyword}/>
            <button className="scripts-search-btn" onClick={handleKeywordSearch} title="search">
                <img width="20" height="20" src={MagGlass} alt="search scripts"/>
            </button> 
            <select name="sort" onChange={handleSort} defaultValue="abc"> 
                <option value="abc">Alphabetically</option>
                <option value="date">Last Modified</option> 
                <option value="size">Script Length</option>
            </select>
            {/* descending means smaller/least amount of a quality will be last, ascending means smaller will be first */}
        <button className="search-btn-sort" onClick={toggleSortDirection}>{sortDirection === 'desc' ? '↑':'↓'}</button>
        </form> 
        </>
    )
} 

export default ScriptsSearch