import {combineReducers} from 'redux';
import {GET_MOVIES, GET_TV_SHOWS, SEARCH_MOVIES} from "../action-types";

const defaultValue = {
    movies: [],
    tvShows: [],
    foundMovies: []
};

const moviesReducer = (store = defaultValue, action) => {
    switch (action.type) {
        case GET_MOVIES: {
            return {
                ...store,
                movies: action.payload
            }
        }
        case GET_TV_SHOWS: {
            return {
                ...store,
                tvShows: action.payload
            }
        }
        case SEARCH_MOVIES: {
            return {
                ...store,
                foundMovies: action.payload
            }
        }
        default:
            return store;
    }
};

export const mainReducer = () => {
    return combineReducers({
        moviesReducer,
    });
};
