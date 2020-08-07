import React, {useEffect} from "react";
import {allGenres, genresForRender} from "../../constants";
import Genres from "../genres/Genres";
import MovieCard from "../movie-card/MovieCard";
import TVShowCard from "../tv-show-card/TVShowCard";
import {FetchError} from "../fetch-error/FetchError";
import './ListByGenre.scss';

export const ListByGenre = (props) => {
    useEffect(() => window.scrollTo(0, 0));

    const {movies, tvShows, isLoading, error, flag} = props;


    return (
        <div className="movie-container">
            {
                isLoading && (
                    <div className="text-center m-2">
                        <div className="spinner-border text-secondary" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>)
            }

            {
                !isLoading && !error && flag && <Genres genres={allGenres} flag/>
            }

            {
                !isLoading && !error && !flag && <Genres genres={genresForRender}/>
            }

            <div className="card-container">
                {
                    !!error && (<FetchError error={error}/>)
                }

                {
                    !isLoading && movies && movies.map(movie => <MovieCard movie={movie} key={movie.id}/>)
                }

                {
                    !isLoading && tvShows && tvShows.map(tvShow => <TVShowCard tvShow={tvShow} key={tvShow.id}/>)
                }
            </div>
        </div>
    )
};
