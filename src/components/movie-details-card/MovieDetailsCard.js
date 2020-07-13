import React from "react";
import defaultImage from '../../assets/default-movie-portrait.jpg';
import {RadialProgressBar} from "../radial-progress-bar/RadialProgressBar";
import './MovieDetailsCard.scss';

export const MovieDetailsCard = (props) => {
    const {movie, addToWatchlist} = props;
    const {
        title,
        backdrop_path,
        poster_path,
        release_date,
        runtime,
        genres,
        vote_average,
        tagline,
        overview,
        budget,
        revenue,
        imdb_id,
        homepage,
    } = movie;

    let movieDate = '';
    if (release_date) {
        const date = new Date(release_date)
        const dateTimeFormat = new Intl.DateTimeFormat('en', {year: 'numeric', month: 'short', day: '2-digit'})
        const [{value: month}, , {value: day}, , {value: year}] = dateTimeFormat.formatToParts(date)
        movieDate = `${month} ${day}, ${year}`;
    } else {
        movieDate = 'Release date unknown';
    }

    const movieBackgroundPath = backdrop_path ? `https://image.tmdb.org/t/p/original${backdrop_path}` : defaultImage;

    let movieBackgroundImageStyles = {
        backgroundImage: `url(${movieBackgroundPath})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        overflow: 'hidden',
        backgroundPosition: 'right -200px top'
    }

    return (
        <div style={movieBackgroundImageStyles}>
            <div className="container-fluid movie-details-container">
                <div className="container">
                    <div className="d-flex">
                        <div className="movie-poster">
                            <img src={poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : `${defaultImage}`}
                                 alt={title}/>
                        </div>

                        <div className="movie-details-info">

                            <h2>{title}</h2>

                            <div>
                                <div>Release date: {movieDate}</div>
                                <div className="d-flex ">Genres: &nbsp;
                                    {
                                        !!genres.length && genres.map(genre => <div
                                            key={genre.id}>{genre.name}&nbsp;</div>)
                                    }
                                </div>
                                <div>Duration: {runtime} minutes</div>
                                <div>Budget: ${budget}</div>
                                <div>Box office: ${revenue}</div>
                            </div>

                            <div className="movie-details-actions">
                                <div className="movie-details-radialProgressBar">
                                    <RadialProgressBar rating={vote_average}/>
                                </div>
                                <div><b>User<br/>Score</b></div>
                                <div className="movie-details-actions-link">
                                    <div>
                                        <a href={homepage}>&#9733;Visit homepage</a>
                                    </div>
                                    <div>
                                        <div onClick={addToWatchlist}>&#9733;Add to watchlist</div>
                                    </div>
                                </div>
                            </div>

                            <div className="tagline">&#10077;  {tagline}&#10078;</div>
                            <div className="overview">
                                <h4>Overview</h4>
                                <div>{overview}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};
