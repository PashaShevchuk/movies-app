import React from 'react';
import TVShowCard from "../tv-show-card/TVShowCard";
import {FetchError} from "../fetch-error/FetchError";
import './TVShowList.scss';

export const TVShowList = (props) => {
    const {tvShows, isLoading, error} = props;
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
            <div className="card-container">
                {
                    !!error && (<FetchError error={error}/>)
                }
                {
                    !isLoading && tvShows.map(tvShow => <TVShowCard tvShow={tvShow} key={tvShow.id}/>)
                }
            </div>
        </div>
    );
};