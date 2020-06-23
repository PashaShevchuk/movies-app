import React from "react";
import './MovieCard.scss'
import {RadialProgressBar} from "../radial-progress-bar/RadialProgressBar";
import defaultImage from '../../assets/default-movie-portrait.jpg';

export const MovieCard = (props) => {
    const {movie} = props;
    const {title, release_date, poster_path, vote_average} = movie;
    let movieDate = '';
    if (release_date) {
        const date = new Date(release_date)
        const dateTimeFormat = new Intl.DateTimeFormat('en', {year: 'numeric', month: 'short', day: '2-digit'})
        const [{value: month}, , {value: day}, , {value: year}] = dateTimeFormat.formatToParts(date)
        movieDate = `${month} ${day}, ${year}`;
    } else {
        movieDate = 'Release date unknown';
    }

    return (
        <div className="movie-card">
            <div className="movie-card-img">
                <img src={poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : `${defaultImage}`}
                     alt={title}
                />
            </div>
            <div className="movie-card-title">
                <RadialProgressBar rating={vote_average}/>
                {title}
            </div>
            <div className="movie-card-date">{movieDate}</div>
        </div>
    );
};