import React, {useContext, useRef, useState} from 'react'

export const ScriptsSearch = () => {
    return (
        <form className="atl-form search-form">
            <input type="text" name="keyword" placeholder="keyword"/>
            <button className="scripts-search-btn">Find Scripts</button>
            <select name="sort">
                <option value="abc">Alphabetical</option>
                <option value="date">Last Modified</option>
                <option value="size">Script Length</option>
            </select>
            {/* button toggle for ascending/descending  */}
        </form>
    )
}
