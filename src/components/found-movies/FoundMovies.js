import React from "react";
import {connect} from "react-redux";
import {MovieCard} from "../movie-card/MovieCard";
import './FoundMovies.scss'

const FoundMovies = (props) => {
    const {foundMovies} = props;
    return (
        <div className="card-container">
            {
                foundMovies.map(movie => <MovieCard movie={movie} key={movie.id}/>)
            }
        </div>
    )
};

const mapStateToProps = (store) => {
    const {moviesReducer} = store;
    return {
        foundMovies: moviesReducer.foundMovies,
    }
};

export default connect(mapStateToProps, null)(FoundMovies);
