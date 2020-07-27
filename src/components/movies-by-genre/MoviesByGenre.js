import React, {Component} from 'react';
import {apiKey} from "../../constants";
import {MoviesList} from "../movies-list/MoviesList";
import {Pagination} from "../pagination/Pagination";
import {TVShowList} from "../tv-show-list/TVShowList";

class MoviesByGenre extends Component {
    state = {
        movies: [],
        isLoading: false,
        error: '',
        movieTotalResults: 0,
        movieCurrentPage: 1,
    }

    componentDidMount() {
        this.loadMovie();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {match: {params: {id: prevId}}} = prevProps;
        const {match: {params: {id}}} = this.props;
        if (prevId !== id) this.loadMovie();
    }

    loadMovie = async () => {
        const {match: {params: {id}}, flag} = this.props;
        this.setState({isLoading: true});
        let response = await fetch(`${flag 
            ? `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=${id}` 
            : `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${id}`}`);
        if (response.ok) {
            let result = await response.json();
            this.setState({movieTotalResults: result.total_results})
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

    movieNextPage = async (pageNumber) => {
        window.scrollTo(0, 0);
        const {match: {params: {id}}, flag} = this.props;
        let response = await fetch(`${flag
            ? `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=${id}&page=${pageNumber}`
            : `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${id}&page=${pageNumber}`}`);
        if (response.ok) {
            let json = await response.json();
            this.setState({movieTotalResults: json.total_results, movieCurrentPage: pageNumber})
            const {results} = json;
            if (Array.isArray(results)) {
                this.setState({
                    movies: results
                });
            }
        }
    }

    render() {
        const {movies, isLoading, error} = this.state;
        const {flag} = this.props;
        let movieNumberPages = Math.floor(this.state.movieTotalResults / 20);

        return (
            <div>
                {
                    !isLoading && flag && <TVShowList tvShows={movies}
                                                      isLoading={isLoading}
                                                      error={error}/>
                }

                {
                    !isLoading && !flag && <MoviesList movies={movies}
                                                       isLoading={isLoading}
                                                       error={error}/>
                }

                {
                    this.state.movieTotalResults > 20 && <Pagination pages={movieNumberPages}
                                                                     nextPage={this.movieNextPage}
                                                                     currentPage={this.state.movieCurrentPage}/>
                }
            </div>
        );
    }
}

export default MoviesByGenre;
