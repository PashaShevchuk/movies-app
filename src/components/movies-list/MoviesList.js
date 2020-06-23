import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getMovies} from "../../actions";
import {MovieCard} from "../movie-card/MovieCard";
import {apiKey} from "../../constants";
import {FetchError} from "../fetch-error/FetchError";
import './MovieList.scss';

class MoviesList extends Component {
    state = {
        isLoading: false,
        error: ''
    }

    componentDidMount() {
        this.loadMovies();
    }

    loadMovies = async () => {
        const {getMovies} = this.props;
        this.setState({isLoading: true});
        let response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`);
        if (response.ok) {
            let json = await response.json();
            const {results} = json;
            if (Array.isArray(results)) {
                this.setState({
                    isLoading: false,
                    error: '',
                });
                getMovies(results)
            }
        } else {
            this.setState({
                isLoading: false,
                error: response.status,
            });
        }
    }

    render() {
        const {movies} = this.props;
        const {isLoading, error} = this.state;
        return (
            <div className="movie-container">
                {
                    isLoading && (
                        <div className="text-center m-2">
                            <div className="spinner-border text-secondary" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>)
                }
                <div className="card-container">
                    {
                        !!error && (<FetchError error={error}/>)
                    }
                    {
                        !isLoading && movies.map(movie => <MovieCard movie={movie} key={movie.id}/>)
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
    }
};

const mapDispatchToProps = ({
    getMovies
});

export default connect(mapStateToProps, mapDispatchToProps)(MoviesList);