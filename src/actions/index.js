import {
    MOVIES_LOADED,
    START_MOVIES_LOADIND,
    ERROR_LOADIND_MOVIES,
    STOP_MOVIES_LOADIND
} from "../action-types";
import {apiKey} from "../constants";


//======================================================================================================================
export const getMovies = () => {
    return (dispatch, getState) => {
        dispatch(startMoviesLoading());

        return fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`)
            .then(response => response.json())
            .then((data) => {
                dispatch({
                    type: MOVIES_LOADED,
                    payload: data.results
                });
                dispatch(stopMoviesLoading());

            })
            .catch((error) => {
                dispatch({
                    type: ERROR_LOADIND_MOVIES,
                    payload: error
                })
            })
    }
};

export const startMoviesLoading = () => {
    return {
        type: START_MOVIES_LOADIND
    }
};

export const stopMoviesLoading = () => {
    return {
        type: STOP_MOVIES_LOADIND
    }
};
//======================================================================================================================