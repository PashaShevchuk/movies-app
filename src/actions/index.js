import {GET_MOVIES, SEARCH_MOVIES} from "../action-types";

export const getMovies = (movie) => {
    return {
        type: GET_MOVIES,
        payload: movie
    }
};

export const searchMovies = (movie) => {
    return {
        type: SEARCH_MOVIES,
        payload: movie
    }
};