import React from 'react';
import MovieCard from "../movie-card/MovieCard";
import {FetchError} from "../fetch-error/FetchError";
import Genres from "../genres/Genres";
import {genresForRender} from "../../constants";
import './MovieList.scss';

export const MoviesList = (props) => {
    const {movies, isLoading, error, flag} = props;
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
                !isLoading && !error && !flag && <Genres genres={genresForRender}/>
            }
            <div className="card-container">
                {
                    !!error && (<FetchError error={error}/>)
                }

                {
                    !isLoading && movies.map(movie => <MovieCard movie={movie} key={movie.id}/>)
                }
            </div>
        </div>
    );
};
