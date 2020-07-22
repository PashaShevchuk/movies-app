import React from "react";
import {Link} from 'react-router-dom';
import {genresForRender} from "../../constants/index";
import './Genres.scss'

const Genres = () => {
    return (
        <div className="genres-for-render container">
            {
                genresForRender.map(genre => <div key={genre.id} className="genres-for-render-genre">
                    <Link to={`/movies/genre/${genre.id}`} className="genres-for-render-link">{genre.name}</Link>
                </div>)
            }
        </div>
    );
};

export default Genres;
