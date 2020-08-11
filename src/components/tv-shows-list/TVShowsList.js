import React, {Component} from 'react';
import {connect} from "react-redux";
import {allGenres, apiKey} from "../../constants";
import {getTVShows} from "../../actions";
import Genres from "../genres/Genres";
import {FetchError} from "../fetch-error/FetchError";
import {Pagination} from "../pagination/Pagination";
import TVShowCard from "../tv-show-card/TVShowCard";

class TVShowsList extends Component {
    state = {
        isTVShowsLoading: false,
        errorTVShows: '',
        TVShowsTotalResults: 0,
        TVShowsCurrentPage: 1,
    }

    componentDidMount() {
        this.loadTVShows();
    }

    loadTVShows = async () => {
        const {getTVShows} = this.props;
        this.setState({isTVShowsLoading: true});
        let response = await fetch(`https://api.themoviedb.org/3/discover/tv/?api_key=${apiKey}`);
        if (response.ok) {
            let json = await response.json();
            this.setState({TVShowsTotalResults: json.total_results})
            const {results} = json;
            if (Array.isArray(results)) {
                this.setState({
                    isTVShowsLoading: false,
                    errorTVShows: '',
                });
                getTVShows(results)
            }
        } else {
            this.setState({
                isTVShowsLoading: false,
                errorTVShows: response.status,
            });
        }
    }

    TVShowsNextPage = async (pageNumber) => {
        window.scrollTo(0, 0);
        const {getTVShows} = this.props;
        let response = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&page=${pageNumber}`);
        if (response.ok) {
            let json = await response.json();
            this.setState({TVShowsTotalResults: json.total_results, TVShowsCurrentPage: pageNumber})
            const {results} = json;
            if (Array.isArray(results)) {
                getTVShows(results)
            }
        }
    }

    render() {
        const {tvShows} = this.props;
        const {isTVShowsLoading, errorTVShows} = this.state;
        const tvShowsNumberPages = Math.floor(this.state.TVShowsTotalResults / 20);
        return (
            <div className="movie-container">
                {
                    isTVShowsLoading && (
                        <div className="text-center m-2">
                            <div className="spinner-border text-secondary" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>)
                }

                {
                    !isTVShowsLoading && !errorTVShows && <Genres genres={allGenres} flag/>
                }
                <div className="card-container">
                    {
                        !!errorTVShows && (<FetchError error={errorTVShows}/>)
                    }

                    {
                        !isTVShowsLoading && tvShows.map(tvShow => <TVShowCard tvShow={tvShow} key={tvShow.id}/>)
                    }
                </div>
                {
                    this.state.TVShowsTotalResults > 20 &&
                    <Pagination pages={tvShowsNumberPages}
                                nextP={this.TVShowsNextPage}
                                currentPage={this.state.TVShowsCurrentPage}/>
                }
            </div>
        );
    }
}

const mapStateToProps = (store) => {
    const {moviesReducer} = store;
    return {
        tvShows: moviesReducer.tvShows,
    }
};

const mapDispatchToProps = ({
    getTVShows,
});

export default connect(mapStateToProps, mapDispatchToProps)(TVShowsList);
