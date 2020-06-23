import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getMovies} from "../../actions";
import {MovieCard} from "../movie-card/MovieCard";

class MoviesList extends Component {
    componentDidMount() {
        const {movies, getMovies} = this.props;
        if (!movies.length) {
            getMovies && getMovies();
        }
    }

    render() {
        const {movies, isMoviesLoading} = this.props;
        return (
            <div>
                {
                    isMoviesLoading && (
                        <div className="text-center m-2">
                            <div className="spinner-border text-secondary" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>)
                }

                <div className="d-flex flex-wrap">
                    {
                        !isMoviesLoading && movies.map(movie => <MovieCard movie={movie} key={movie.id}/>)
                    }
                </div>

            </div>
        );
    }
}

const mapStateToProps = (store) => {
    const {moviesReducer} = store;
    return {
        movies: moviesReducer.movies,
        isMoviesLoading: moviesReducer.isMoviesLoading
    }
};

const mapDispatchToProps = ({
    getMovies
});

export default connect(mapStateToProps, mapDispatchToProps)(MoviesList);