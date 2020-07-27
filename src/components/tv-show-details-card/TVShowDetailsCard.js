import React from "react";
import {withRouter} from "react-router";
import {RadialProgressBar} from "../radial-progress-bar/RadialProgressBar";
import defaultImage from '../../assets/default-movie-portrait.jpg';
import watchListIcon from '../../assets/watch-list-icon-white.png'
import watchListIconRed from '../../assets/watch-list-icon-red.png'
import homePageIcon from '../../assets/home-solid-white.png'

import './TVShowDetailsCard.scss';

export const TVShowDetailsCardComponent = (props) => {
    const {tvShow, history, addToWatchlist, watchlist} = props;
    const {
        name,
        backdrop_path,
        poster_path,
        first_air_date,
        genres,
        episode_run_time,
        number_of_seasons,
        number_of_episodes,
        production_companies,
        vote_average,
        homepage,
        overview,
        status,
        last_episode_to_air,
    } = tvShow;


    let firstReliseDate = '';
    if (first_air_date) {
        const date = new Date(first_air_date)
        const dateTimeFormat = new Intl.DateTimeFormat('en', {year: 'numeric', month: 'short', day: '2-digit'})
        const [{value: month}, , {value: day}, , {value: year}] = dateTimeFormat.formatToParts(date)
        firstReliseDate = `${month} ${day}, ${year}`;
    } else {
        firstReliseDate = 'Release date unknown';
    }

    let lastReliseDate = '';
    if (last_episode_to_air.air_date) {
        const date = new Date(last_episode_to_air.air_date)
        const dateTimeFormat = new Intl.DateTimeFormat('en', {year: 'numeric', month: 'short', day: '2-digit'})
        const [{value: month}, , {value: day}, , {value: year}] = dateTimeFormat.formatToParts(date)
        lastReliseDate = `${month} ${day}, ${year}`;
    } else {
        lastReliseDate = 'Release date unknown';
    }

    const movieBackgroundPath = backdrop_path ? `https://image.tmdb.org/t/p/original${backdrop_path}` : '';

    let movieBackgroundImageStyles = {
        backgroundImage: `url(${movieBackgroundPath})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        overflow: 'hidden',
        backgroundPosition: 'right -200px top'
    }

    const goBack = () => {
        history.go(-1)
    };

    return (
        <div style={movieBackgroundImageStyles}>
            <div className="container-fluid movie-details-container">
                <div className="container">
                    <div onClick={goBack} className="go-back">&#9668; go back</div>
                    <div className="container-poster-and-details">
                        <div className="movie-poster">
                            <img src={poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : `${defaultImage}`}
                                 alt={name}/>
                        </div>

                        <div className="movie-details-info">
                            <h2>{name}</h2>
                            <div>
                                <div><b>First release date:</b> {firstReliseDate}</div>
                                <div><b>Last release date:</b> {lastReliseDate}</div>
                                {
                                    !!genres.length && <div className="d-flex "><b>Genres:</b> &nbsp;
                                        {
                                            genres.map(genre => <div key={genre.id}>{genre.name}&nbsp;|&nbsp;</div>)
                                        }
                                    </div>
                                }

                                <div><b>Number of seasons:</b> {number_of_seasons}</div>
                                <div><b>Number of episodes:</b> {number_of_episodes}</div>
                                <div><b>Episode running time:</b> {episode_run_time[0]} minutes</div>
                                <div><b>Status:</b> {status}</div>
                                <div>
                                    {
                                        !!production_companies.length && (
                                            <div className="d-flex flex-wrap"><b>Production companies:</b> &nbsp;
                                                {
                                                    production_companies.map(item => <div
                                                        key={item.id}>{item.name}&nbsp;|&nbsp;</div>)
                                                }
                                            </div>)
                                    }
                                </div>
                            </div>

                            <div className="movie-details-actions">
                                <div className="movie-details-radialProgressBar">
                                    <RadialProgressBar rating={vote_average}/>
                                </div>
                                <div><b>User<br/>Score</b></div>
                                <div className="watch-list d-flex">
                                    <div onClick={addToWatchlist} className="movie-details-icons">
                                        <img
                                            src={watchlist.find(value => value.id === tvShow.id) ? watchListIconRed : watchListIcon}
                                            alt="watchListIcon"
                                            title="Add tv show to your watchlist"/>
                                    </div>

                                    {
                                        homepage && <div className="movie-details-icons">
                                            {/* eslint-disable-next-line react/jsx-no-target-blank */}
                                            <a href={homepage} target="_blank" title="Visit Homepage">
                                                <img src={homePageIcon} alt="homePageIcon"/>
                                            </a>
                                        </div>
                                    }
                                </div>
                            </div>

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

export const TVShowDetailsCard = withRouter(TVShowDetailsCardComponent);
