import React from "react";
import {withRouter} from 'react-router';
import {Link} from 'react-router-dom';
import {DarkThemeContext} from "../../context/DarkThemeContext";
import {RadialProgressBar} from "../radial-progress-bar/RadialProgressBar";
import {allGenres} from "../../constants";
import defaultImage from '../../assets/default-movie-portrait.jpg';
import './TVShowCard.scss'

const TVShowCard = (props) => {
    const {tvShow, match: {url}} = props;
    const {name, first_air_date, poster_path, vote_average, genre_ids, genres} = tvShow;

    let twShowGenres = [];
    if (genre_ids) {
        genre_ids.forEach(id => twShowGenres.push(allGenres.find(item => item.id === id)));
    } else if (genres) {
        genres.forEach(genre => twShowGenres.push(allGenres.find(item => item.id === genre.id)));
    }

    let tvShowDate = '';
    if (first_air_date) {
        const date = new Date(first_air_date)
        const dateTimeFormat = new Intl.DateTimeFormat('en', {year: 'numeric', month: 'short', day: '2-digit'})
        const [{value: month}, , {value: day}, , {value: year}] = dateTimeFormat.formatToParts(date)
        tvShowDate = `${month} ${day}, ${year}`;
    } else {
        tvShowDate = 'Release date unknown';
    }

    return (
        <DarkThemeContext.Consumer>
            {
                (value) => {
                    const {isDarkTheme} = value;
                    return (
                        <div className={`tv-show-card ${isDarkTheme ? 'black' : ''}`}>

                            <div className="tv-show-card-img">
                                <Link to={`${url}/${tvShow.id}`} title={name}>
                                    <img
                                        src={poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : `${defaultImage}`}
                                        alt={name}/>
                                </Link>
                            </div>

                            <div className="tv-show-card-progress-bar">
                                <RadialProgressBar rating={vote_average}/>
                            </div>

                            <div className='d-flex flex-wrap genres'>
                                {
                                    !!twShowGenres.length && twShowGenres.map(genre => <div key={genre.id}
                                                                                            className="tv-show-genres">{genre.name}</div>)
                                }
                            </div>

                            <div>
                                <Link className={`tv-show-card-title${isDarkTheme ? '-black' : ''}`}
                                      to={`${url}/${tvShow.id}`}
                                      title={name}>
                                    {name}
                                </Link>
                            </div>

                            <div className="tv-show-card-date">{tvShowDate}</div>

                        </div>
                    )
                }
            }
        </DarkThemeContext.Consumer>
    );
};

export default withRouter(TVShowCard);
