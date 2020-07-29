import React from "react";
import {withRouter} from "react-router";
import {DarkThemeContext} from "../../context/DarkThemeContext";
import defaultImage from '../../assets/default-movie-portrait.jpg';
import watchListIcon from '../../assets/watch-list-icon-white.png'
import watchListIconRed from '../../assets/watch-list-icon-red.png'
import imdbIcon from '../../assets/imdb-brands-white.png'
import homePageIcon from '../../assets/home-solid-white.png'
import {RadialProgressBar} from "../radial-progress-bar/RadialProgressBar";
import './MovieDetailsCard.scss';

const MovieDetailsCardComponent = (props) => {
    const {movie, addToWatchlist, watchlist, history} = props;
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
        production_companies,
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
        <DarkThemeContext.Consumer>
            {
                (value) => {
                    const {isDarkTheme} = value;
                    return (
                        <div style={movieBackgroundImageStyles}>
                            <div className="container-fluid movie-details-container">
                                <div className="container">
                                    <div onClick={goBack} className="go-back">&#9668; go back</div>
                                    <div className="container-poster-and-details">
                                        <div className="movie-poster">
                                            <img
                                                src={poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : `${defaultImage}`}
                                                alt={title}/>
                                        </div>

                                        <div className={`movie-details-info${isDarkTheme ? '-black' : ''}`}>

                                            <h2>{title}</h2>

                                            <div>
                                                <div><b>Release date:</b> {movieDate}</div>
                                                {
                                                    !!genres.length && <div className="d-flex "><b>Genres:</b> &nbsp;
                                                        {
                                                            genres.map(genre => <div
                                                                key={genre.id}>{genre.name}&nbsp;|&nbsp;</div>)
                                                        }
                                                    </div>
                                                }

                                                <div><b>Running time:</b> {runtime} minutes</div>
                                                <div><b>Budget:</b> ${budget}</div>
                                                <div><b>Revenue:</b> ${revenue}</div>
                                                <div>
                                                    {
                                                        !!production_companies.length && (
                                                            <div className="d-flex flex-wrap"><b>Production
                                                                companies:</b> &nbsp;
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
                                                            src={watchlist.find(value => value.id === movie.id)
                                                                ? watchListIconRed
                                                                : watchListIcon}
                                                            alt="watchListIcon"
                                                            title={watchlist.find(value => value.id === movie.id)
                                                                ? "Remove from your watchlist"
                                                                : "Add to your watchlist"}
                                                        />
                                                    </div>

                                                    {
                                                        homepage && <div className="movie-details-icons">
                                                            {/* eslint-disable-next-line react/jsx-no-target-blank */}
                                                            <a href={homepage} target="_blank" title="Visit Homepage">
                                                                <img src={homePageIcon} alt="homePageIcon"/>
                                                            </a>
                                                        </div>
                                                    }

                                                    {
                                                        imdb_id && <div className="movie-details-icons">
                                                            {/* eslint-disable-next-line react/jsx-no-target-blank */}
                                                            <a target="_blank"
                                                               href={`https://www.imdb.com/title/${imdb_id}`}
                                                               title="Visit IMDb">
                                                                <img src={imdbIcon} alt="imdbIcon"/>
                                                            </a>
                                                        </div>
                                                    }
                                                </div>
                                            </div>

                                            {
                                                tagline && <div className="tagline">&#10077;  {tagline}&#10078;</div>
                                            }

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
                }
            }
        </DarkThemeContext.Consumer>
    )
};

export const MovieDetailsCard = withRouter(MovieDetailsCardComponent);
