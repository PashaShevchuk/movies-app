import {GET_MOVIES, GET_TV_SHOWS, SEARCH_MOVIES} from "../action-types";

export const getMovies = (movie) => {
    return {
        type: GET_MOVIES,
        payload: movie
    }
};

export const getTVShows = (tvShow) => {
    return {
        type: GET_TV_SHOWS,
        payload: tvShow
    }
};

export const searchMovies = (movie) => {
    return {
        type: SEARCH_MOVIES,
        payload: movie
    }
};
