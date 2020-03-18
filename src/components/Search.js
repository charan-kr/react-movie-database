import React from 'react';

function  Search({handleInput, search, message}) {

    return (
        <section className="searchbox-wrap">
            <input type="text" placeholder="Search for a movie..."
            className="searchbox"
            name="search"
            onChange={handleInput} 
            onKeyPress={search}
             />
            <div className="message">
               <h3>{message}</h3> 
            </div>
        </section>
    );
}

export default Search;
