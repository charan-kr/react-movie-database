import React from 'react';
import { Link } from 'react-router-dom';

function Result({ result, openPopup }) {
    return (
     <Link className="result" to = {"/"+result.Title} >  
        <div className="" onClick={() => openPopup(result.imdbID)}>
            <img src={result.Poster} alt={result.Title}/>
            <h3>{result.Title}</h3>
        </div>
    </Link>
    )
}

export default Result
