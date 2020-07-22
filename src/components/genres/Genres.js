import React from "react";
import {Link} from 'react-router-dom';
import {genresForRender} from "../../constants/index";

const Genres = () => {
    return (
        <div>
            {
                genresForRender.map(genre => <div key={genre.id}>
                    <Link to={`/movies/genre/${genre.id}`}>{genre.name}</Link>
                </div>)
            }
        </div>
    );
};

export default Genres;
