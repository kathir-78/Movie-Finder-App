import React from 'react'

export  const Search = ({searchTerm, setSearchTerm}) => {
    return (
        <div className="search">
            <div>
                <img src="/search.svg" alt="" />
                <input type="text" 
                value={searchTerm}
                placeholder="Search through Thousands of movies online"
                onChange={(e)=> setSearchTerm(e.target.value)}
                />
            </div>
        </div>
    )
}


