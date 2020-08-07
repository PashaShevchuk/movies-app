import React from "react";
import {withRouter} from 'react-router';
import {Link} from 'react-router-dom';
import {DarkThemeContext} from "../../context/DarkThemeContext";
import {RadialProgressBar} from "../radial-progress-bar/RadialProgressBar";
import {allGenres} from "../../constants";
import defaultImage from '../../assets/default-movie-portrait.jpg';
import './MovieCard.scss'

const MovieCard = (props) => {
    const {movie, match: {url}} = props;
    const {title, release_date, poster_path, vote_average, genre_ids, genres} = movie;

    let movieGenres = [];
    if (genre_ids) {
        genre_ids.forEach(id => movieGenres.push(allGenres.find(item => item.id === id)));
    } else if (genres) {
        genres.forEach(genre => movieGenres.push(allGenres.find(item => item.id === genre.id)));
    }

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
        <DarkThemeContext.Consumer>
            {
                (value) => {
                    const {isDarkTheme} = value;
                    return (
                        <div className={`movie-card ${isDarkTheme ? 'black' : ''}`}>

                            <div className="movie-card-img">
                                <Link to={`${url}/movie/${movie.id}`} title={title}>
                                    <img
                                        src={poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : `${defaultImage}`}
                                        alt={title}/>
                                </Link>
                            </div>

                            <div className="movie-card-progress-bar">
                                <RadialProgressBar rating={vote_average}/>
                            </div>

                            <div className='d-flex flex-wrap genres'>
                                {
                                    !!movieGenres.length && movieGenres.map(genre => <div key={genre.id}
                                                                                          className="movie-genres">{genre.name}</div>)
                                }
                            </div>

                            <div>
                                <Link className={`movie-card-title${isDarkTheme ? '-black' : ''}`}
                                      to={`${url}/movie/${movie.id}`}
                                      title={title}>
                                    {title}
                                </Link>
                            </div>

                            <div className="movie-card-date">{movieDate}</div>

                        </div>
                    )
                }
            }
        </DarkThemeContext.Consumer>
    );
};

export default withRouter(MovieCard);
