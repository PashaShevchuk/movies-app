import {combineReducers} from 'redux';
import {GET_MOVIES, SEARCH_MOVIES} from "../action-types";

const defaultValue = {
    movies: [],
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