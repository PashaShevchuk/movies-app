import React from "react";
import {withRouter} from 'react-router';
import {Link} from 'react-router-dom';
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
        <div className="movie-card">

            <div className="movie-card-img">
                <Link to={`${url}/${tvShow.id}`} title={name}>
                    <img src={poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : `${defaultImage}`}
                         alt={name}/>
                </Link>
            </div>

            <div className="movie-card-progress-bar">
                <RadialProgressBar rating={vote_average}/>
            </div>

            <div className='d-flex flex-wrap genres'>
                {
                    !!twShowGenres.length && twShowGenres.map(genre => <div key={genre.id}
                                                                            className="movie-genres">{genre.name}</div>)
                }
            </div>

            <div>
                <Link className="movie-card-title" to={`${url}/${tvShow.id}`} title={name}>{name}</Link>
            </div>

            <div className="movie-card-date">{tvShowDate}</div>

        </div>
    );
};

export default withRouter(TVShowCard);
