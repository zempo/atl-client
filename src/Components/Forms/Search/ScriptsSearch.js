import React, {useContext, useRef, useState} from 'react'
import { useInput } from '../../../Hooks/use-input';
import MagGlass from '../../../Images/mGlass.svg.png'
import { ScriptsContext } from '../../../Contexts/ScriptsContext';
import { readScripts } from '../../../Services/endpoints-service';
import { sortByKeyword } from '../../../Services/algos-service';

export const ScriptsSearch = () => {
    const { value: keyword, bind: bindKeyword, reset: resetKeyword } = useInput("");
    const [sortDirection, setSortDirection] = useState('desc') 
    const {value: {setSearchScripts, setSearching}} = useContext(ScriptsContext)

    const handleKeywordSearch = async e => {
        e.preventDefault()

        setSearching(true)
        try {
            const resetScripts = await readScripts.get('/')
            const keywordSearch = await sortByKeyword(resetScripts.data, keyword)
            
            setSearchScripts(keywordSearch)
            resetKeyword()
        } catch (err) {
            console.log(err)
        }
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
            <fieldset className="keyword-search">

            <input type="text" name="keyword" placeholder="Search Your Scripts" {...bindKeyword}/>
            <button className="scripts-search-btn" onClick={handleKeywordSearch} title="search">
                <img width="20" height="20" src={MagGlass} alt="search scripts"/>
            </button> 
            </fieldset>
            <fieldset className="sort-search">
            <select name="sort" onChange={handleSort} defaultValue="abc"> 
                <option value="abc">Alphabetically</option>
                <option value="date">Last Modified</option> 
                <option value="size">Script Length</option>
            </select>
            {/* descending means smaller/least amount of a quality will be last, ascending means smaller will be first */}
        <button className="search-btn-sort" onClick={toggleSortDirection}>{sortDirection === 'desc' ? '↑':'↓'}</button>
            </fieldset>
        </form> 
        </>
    )
} 

export default ScriptsSearch