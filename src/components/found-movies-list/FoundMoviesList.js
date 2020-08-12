import React, {useEffect} from 'react';
import MovieCard from "../movie-card/MovieCard";
import {FetchError} from "../fetch-error/FetchError";
import Genres from "../genres/Genres";
import {genresForRender} from "../../constants";
import {Pagination} from "../pagination/Pagination";
import './FoundMoviesList.scss';

export const FoundMoviesList = (props) => {
    useEffect(() => window.scrollTo(0, 0));

    const {movies, isLoading, error, flag, totalResults, nextP, currentPage, searchTerm} = props;
    const numberPages = Math.floor(totalResults / 20);

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
                    !isLoading && !movies.length && (
                        <div className="no-results">
                            No results were found for "{searchTerm}".<br/>
                            Make sure that the title is entered correctly, or try entering at least one word from the
                            title.
                        </div>
                    )
                }

                {
                    !isLoading && !!movies.length && movies.map(movie => <MovieCard movie={movie} key={movie.id}/>)
                }
            </div>

            {
                totalResults > 20 &&
                <Pagination pages={numberPages}
                            nextP={nextP}
                            currentPage={currentPage}/>
            }
        </div>
    );
};
