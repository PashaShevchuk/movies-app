import React, {Component} from 'react';
import {apiKey} from "../../constants";
import {MoviesList} from "../movies-list/MoviesList";

class MoviesByGenre extends Component {
    state = {
        movies: [],
        isLoading: false,
        error: ''
    }

    componentDidMount() {
        this.loadMovie();
    }

    loadMovie = async () => {
        const {match: {params: {id}}} = this.props;
        this.setState({isLoading: true});
        let response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${id}`);
        if (response.ok) {
            let result = await response.json();
            if (Array.isArray(result.results)) {
                this.setState({
                    isLoading: false,
                    error: '',
                    movies: result.results
                });
            }
        } else {
            this.setState({
                isLoading: false,
                error: response.status
            });
        }
    };

    render() {
        const {movies, isLoading, error} = this.state;

        return (
            <div>
                films by genre
                {
                    !isLoading && <MoviesList movies={movies}
                                              isLoading={isLoading}
                                              error={error}/>
                }
            </div>
        );
    }
}

export default MoviesByGenre;
