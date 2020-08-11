import {combineReducers} from 'redux';
import {
    GET_MOVIES,
    GET_TV_SHOWS,
    SEARCH_MOVIES,
    ADD_TO_WATCHLIST,
    ADD_TV_SHOW_TO_WATCHLIST
} from "../action-types";

const defaultValue = {
    movies: [],
    tvShows: [],
    foundMovies: [],
    watchlist: [],
    watchlistTVShow: [],
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
        case ADD_TO_WATCHLIST: {
            const {payload} = action;
            const {watchlist} = store;
            const index = watchlist.findIndex(value => value.id === payload.id);
            if (index === -1) {
                return {
                    ...store,
                    watchlist: [...watchlist, payload]
                }
            } else if (index >= 0) {
                const watchlistCopy = [...watchlist];
                watchlistCopy.splice(index, 1);
                return {
                    ...store,
                    watchlist: watchlistCopy
                }
            } else return store;
        }
        case ADD_TV_SHOW_TO_WATCHLIST: {
            const {payload} = action;
            const {watchlistTVShow} = store;
            const index = watchlistTVShow.findIndex(value => value.id === payload.id);
            if (index === -1) {
                return {
                    ...store,
                    watchlistTVShow: [...watchlistTVShow, payload]
                }
            } else if (index >= 0) {
                const watchlistTVShowCopy = [...watchlistTVShow];
                watchlistTVShowCopy.splice(index, 1);
                return {
                    ...store,
                    watchlistTVShow: watchlistTVShowCopy
                }
            } else return store;
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
