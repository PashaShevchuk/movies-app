import {
    GET_MOVIES,
    GET_TV_SHOWS,
    SEARCH_MOVIES,
    ADD_TO_WATCHLIST,
    ADD_TV_SHOW_TO_WATCHLIST
} from "../action-types";

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

export const addToWatchlist = (data) => {
    return {
        type: ADD_TO_WATCHLIST,
        payload: data
    }
};

export const addTVShowToWatchlist = (data) => {
    return {
        type: ADD_TV_SHOW_TO_WATCHLIST,
        payload: data
    }
};
