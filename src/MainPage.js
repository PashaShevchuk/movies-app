import React, {Component} from 'react';
import {connect} from "react-redux";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from "react-router-dom";
import {apiKey} from "./constants";
import {searchMovies, getMovies, getTVShows} from "./actions";
import {DarkThemeContext} from "./context/DarkThemeContext";
import {HeaderDesktopAndMobile} from "./components/heder-desktop-and-mobile/HeaderDesktopAndMobile";
import {MoviesList} from "./components/movies-list/MoviesList";
import {Pagination} from "./components/pagination/Pagination";
import MovieDetails from "./components/movie-details/MovieDetails";
import MoviesByGenre from "./components/movies-by-genre/MoviesByGenre";
import Watchlist from "./components/watchlist/Watchlist";
import {TVShowList} from "./components/tv-show-list/TVShowList";
import {AboutUs} from "./components/about-us/AboutUs";
import {Footer} from "./components/footer/Footer";

import './MainPage.scss';

class MainPage extends Component {
    state = {
        // For movies
        isLoading: false,
        error: '',
        movieTotalResults: 0,
        movieCurrentPage: 1,

        // For TV shows
        isTVShowsLoading: false,
        errorTVShows: '',
        TVShowsTotalResults: 0,
        TVShowsCurrentPage: 1,

        // To search movies
        isMovieSearch: false,
        errorSearch: '',
        searchTerm: '',
        totalResults: 0,
        currentPage: 1,
    }

    componentDidMount() {
        this.loadMovies();
        this.loadTVShows();
    }

//=================================== For movies =======================================================================

    loadMovies = async () => {
        const {getMovies} = this.props;
        this.setState({isLoading: true});
        let response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`);
        if (response.ok) {
            let json = await response.json();
            this.setState({movieTotalResults: json.total_results})
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

    movieNextPage = async (pageNumber) => {
        window.scrollTo(0, 0);
        const {getMovies} = this.props;
        let response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${pageNumber}`);
        if (response.ok) {
            let json = await response.json();
            this.setState({movieTotalResults: json.total_results, movieCurrentPage: pageNumber})
            const {results} = json;
            if (Array.isArray(results)) {
                getMovies(results)
            }
        }
    }
//______________________________________________________________________________________________________________________


//=================================== For TV shows ====================================================================

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

//______________________________________________________________________________________________________________________


//=================================== To search movies =================================================================
    handleChange = (e) => {
        this.setState({searchTerm: e.target.value})
    }

    handleSubmit = async (e) => {
        if (this.state.searchTerm === '') return;
        e.preventDefault()
        const {searchMovies} = this.props;
        this.setState({isMovieSearch: true});
        let response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${this.state.searchTerm}`);
        if (response.ok) {
            let json = await response.json();
            this.setState({totalResults: json.total_results})
            const {results} = json;
            if (Array.isArray(results)) {
                this.setState({
                    isMovieSearch: false,
                    errorSearch: '',
                });
                searchMovies(results)
            } else {
                this.setState({
                    isMovieSearch: false,
                    errorSearch: response.status,
                });
            }
        }
    }

    nextPage = async (pageNumber) => {
        window.scrollTo(0, 0);
        const {searchMovies} = this.props;
        let response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${this.state.searchTerm}&page=${pageNumber}`);
        if (response.ok) {
            let json = await response.json();
            this.setState({totalResults: json.total_results, currentPage: pageNumber})
            const {results} = json;
            if (Array.isArray(results)) {
                searchMovies(results)
            }
        }
    }

//______________________________________________________________________________________________________________________

    render() {
        let movieNumberPages = Math.floor(this.state.movieTotalResults / 20);     // For movies
        let tvShowsNumberPages = Math.floor(this.state.TVShowsTotalResults / 20); // For TV shows
        let numberPages = Math.floor(this.state.totalResults / 20);               // To search movies

        return (
            <DarkThemeContext.Consumer>
                {
                    (value) => {
                        const {isDarkTheme} = value;
                        return (
                            <div className={`main-page-container${isDarkTheme ? '-black' : ''}`}>
                                <Router>

                                    <HeaderDesktopAndMobile searchTerm={this.state.searchTerm}
                                                            handleSubmit={this.handleSubmit}
                                                            handleChange={this.handleChange}
                                    />

                                    <Switch>

                                        <Route path="/movies" exact>
                                            <MoviesList movies={this.props.movies}
                                                        isLoading={this.state.isLoading}
                                                        error={this.state.error}
                                            />
                                            {
                                                this.state.movieTotalResults > 20 &&
                                                <Pagination pages={movieNumberPages}
                                                            nextPage={this.movieNextPage}
                                                            currentPage={this.state.movieCurrentPage}/>
                                            }
                                        </Route>

                                        <Route path="/movies/genre/:gId/:id"
                                               render={(routerProps) => {
                                                   return (<MovieDetails {...routerProps} />);
                                               }}
                                        />

                                        <Route path="/movies/genre/:id"
                                               render={(routerProps) => {
                                                   return (<MoviesByGenre {...routerProps} />);
                                               }}
                                        />

                                        <Route path="/movies/:id"
                                               render={(routerProps) => {
                                                   return (<MovieDetails {...routerProps} />);
                                               }}
                                        />


                                        <Route path="/tv-shows" exact>
                                            <TVShowList tvShows={this.props.tvShows}
                                                        isLoading={this.state.isTVShowsLoading}
                                                        error={this.state.errorTVShows}
                                            />
                                            {
                                                this.state.TVShowsTotalResults > 20 &&
                                                <Pagination pages={tvShowsNumberPages}
                                                            nextPage={this.TVShowsNextPage}
                                                            currentPage={this.state.TVShowsCurrentPage}/>
                                            }
                                        </Route>

                                        <Route path="/tv-shows/genre/:gId/:tvId"
                                               render={(routerProps) => {
                                                   return (<MovieDetails {...routerProps} />);
                                               }}
                                        />

                                        <Route path="/tv-shows/genre/:id"
                                               render={(routerProps) => {
                                                   return (<MoviesByGenre {...routerProps} flag/>);
                                               }}
                                        />

                                        <Route path="/tv-shows/:tvId"
                                               render={(routerProps) => {
                                                   return (<MovieDetails {...routerProps} />);
                                               }}
                                        />


                                        <Route path="/found-movies/:id"
                                               render={(routerProps) => {
                                                   return (<MovieDetails {...routerProps} />);
                                               }}
                                        />

                                        <Route path="/found-movies" exact>
                                            <MoviesList movies={this.props.foundMovies}
                                                        isLoading={this.state.isMovieSearch}
                                                        error={this.state.errorSearch}
                                                        flag
                                            />
                                            {
                                                this.state.totalResults > 20 &&
                                                <Pagination pages={numberPages}
                                                            nextPage={this.nextPage}
                                                            currentPage={this.state.currentPage}/>
                                            }
                                        </Route>

                                        <Route path="/watchlist" exact>
                                            <Watchlist/>
                                        </Route>

                                        <Route path="/watchlist/:id"
                                               render={(routerProps) => {
                                                   return (<MovieDetails {...routerProps} />);
                                               }}
                                        />

                                        <Route path="/watchlist/:tvId"
                                               render={(routerProps) => {
                                                   return (<MovieDetails {...routerProps} />);
                                               }}
                                        />

                                        <Route path="/about-us" exact>
                                            <AboutUs/>
                                        </Route>

                                        <Redirect from="/" to="/movies" exact/>

                                    </Switch>

                                    <Footer/>

                                </Router>
                            </div>
                        )
                    }
                }
            </DarkThemeContext.Consumer>
        );
    }
}


const mapStateToProps = (store) => {
    const {moviesReducer} = store;
    return {
        movies: moviesReducer.movies,
        tvShows: moviesReducer.tvShows,
        foundMovies: moviesReducer.foundMovies
    }
};

const mapDispatchToProps = ({
    getMovies,
    searchMovies,
    getTVShows
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
