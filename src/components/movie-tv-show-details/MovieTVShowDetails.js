import React, {Component} from 'react';
import {connect} from "react-redux";
import {apiKey} from "../../constants";
import {FetchError} from "../fetch-error/FetchError";
import {addToWatchlist, addTVShowToWatchlist} from "../../actions";
import {MovieDetailsCard} from "../movie-details-card/MovieDetailsCard";
import {TVShowDetailsCard} from "../tv-show-details-card/TVShowDetailsCard";
import './MovieTVShowDetails.scss';

class MovieTVShowDetails extends Component {
    state = {
        movie: null,
        tvShow: null,
        isLoading: false,
        error: ''
    }

    componentDidMount() {
        this.loadMovie();
    }

    loadMovie = async () => {
        window.scrollTo(0, 0);
        const {match: {params: {id, movieType}}} = this.props;
        this.setState({isLoading: true});
        let response = await fetch(`https://api.themoviedb.org/3/${movieType}/${id}?api_key=${apiKey}`);

        if ((movieType === 'movie') && response.ok) {
            let result = await response.json();
            if (typeof (result) === 'object') {
                this.setState({
                    isLoading: false,
                    error: '',
                    movie: result
                });
            }
        } else if ((movieType === 'tv') && response.ok) {
            let result = await response.json();
            if (typeof (result) === 'object') {
                this.setState({
                    isLoading: false,
                    error: '',
                    tvShow: result
                });
            }
        } else {
            this.setState({
                isLoading: false,
                error: response.status
            });
        }
    };

    addMovieToWatchlist = () => {
        const {movie} = this.state;
        const {addToWatchlist} = this.props;
        addToWatchlist(movie);
    }

    addTVShowToWatchlist = () => {
        const {tvShow} = this.state;
        const {addTVShowToWatchlist} = this.props;
        addTVShowToWatchlist(tvShow);
    }

    render() {
        const {movie, tvShow, isLoading, error} = this.state;
        const {watchlist, watchlistTVShow} = this.props;
        return (
            <div className="movie-details">
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
                    !isLoading && movie && <MovieDetailsCard movie={movie}
                                                             addToWatchlist={this.addMovieToWatchlist}
                                                             watchlist={watchlist}/>
                }

                {
                    !isLoading && tvShow && <TVShowDetailsCard tvShow={tvShow}
                                                               addToWatchlist={this.addTVShowToWatchlist}
                                                               watchlist={watchlistTVShow}
                    />
                }

            </div>
        );
    }
}

const mapStateToProps = (store) => {
    const {moviesReducer} = store;
    return {
        watchlist: moviesReducer.watchlist,
        watchlistTVShow: moviesReducer.watchlistTVShow
    }
};

const mapDispatchToProps = ({
    addToWatchlist,
    addTVShowToWatchlist
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieTVShowDetails);
