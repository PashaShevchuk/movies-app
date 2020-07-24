import React from "react";
import {Link} from 'react-router-dom';
import './Genres.scss'

const Genres = (props) => {
    const {genres, flag} = props;

    return (
        <div className="genres-for-render container">
            {
                genres.map((genre, index) => (
                    <div key={`${flag ? index : genre.id}`} className="genres-for-render-genre">
                        <Link to={`${flag ? `/tv-shows/genre/${genre.id}` : `/movies/genre/${genre.id}`}`}
                              className="genres-for-render-link">
                            {genre.name}
                        </Link>
                    </div>))
            }
        </div>
    );
};

export default Genres;
