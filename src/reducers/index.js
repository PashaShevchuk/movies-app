import {combineReducers} from 'redux';
import {MOVIES_LOADED, START_MOVIES_LOADIND, STOP_MOVIES_LOADIND} from "../action-types";

const defaultValue = {
    movies: [],
    isMoviesLoading: false
};

const moviesReducer = (store = defaultValue, action) => {
    switch (action.type) {
        case MOVIES_LOADED: {
            return {
                ...store,
                movies: action.payload
            }
        }
        case START_MOVIES_LOADIND: {
            return {
                ...store,
                isMoviesLoading: true
            }
        }
        case STOP_MOVIES_LOADIND: {
            return {
                ...store,
                isMoviesLoading: false
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