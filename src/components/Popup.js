import React from 'react';
import { Link } from 'react-router-dom';

function Popup({ selected, closePopup }) {
    return (
        <section className="popup">
            <div className="content">
                <h2> {selected.Title} <span>({selected.Year})</span></h2>
                <p className="rating">Rating : {selected.imdbRating} </p>
                <div className="plot">
                    <img src={selected.Poster} alt="plot" />
                    <p> {selected.Plot} </p>
                </div>
              <Link className="link" to="/">
                <button className="close" onClick={closePopup}>Close</button>
              </Link>  
            </div>
        </section>
    )
}

export default Popup
