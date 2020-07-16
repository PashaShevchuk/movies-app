import React, {Component} from 'react';
import {connect} from "react-redux";
import {apiKey} from "../../constants";
import {FetchError} from "../fetch-error/FetchError";
import {addToWatchlist} from "../../actions";
import {MovieDetailsCard} from "../movie-details-card/MovieDetailsCard";

class MovieDetails extends Component {
    state = {
        movie: null,
        isLoading: false,
        error: ''
    }

    componentDidMount() {
        this.loadMovie();
    }

    loadMovie = async () => {
        const {match: {params: {id}}} = this.props;
        this.setState({isLoading: true});
        let response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`);
        if (response.ok) {
            let result = await response.json();
            if (typeof (result) === 'object') {
                this.setState({
                    isLoading: false,
                    error: '',
                    movie: result
                });
            }
        } else {
            this.setState({
                isLoading: false,
                error: response.status
            });
        }
    };

    addToWatchlist = () => {
        const {movie} = this.state;
        const {addToWatchlist, watchlist} = this.props;
        addToWatchlist(movie);
        console.log(watchlist);

    }

    render() {
        const {movie, isLoading, error} = this.state;
        return (
            <div>
                {
                    isLoading && (
                        <div className="text-center m-2">
                            <div className="spinner-border text-secondary" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>)
                }

                {
                    !!error && (<FetchError error={error}/>)
                }

                {
                    !isLoading && movie && <MovieDetailsCard movie={movie} addToWatchlist={this.addToWatchlist}/>
                }
            </div>
        );
    }
}

const mapStateToProps = (store) => {
    const {moviesReducer} = store;
    return {
        watchlist: moviesReducer.watchlist
    }
};

const mapDispatchToProps = ({
    addToWatchlist
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails);
