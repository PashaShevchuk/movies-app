import React, {Component} from 'react';
import {connect} from "react-redux";
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import {apiKey} from "./constants";
import {searchMovies} from "./actions";
import {DarkThemeContext} from "./context/DarkThemeContext";
import {HeaderDesktopAndMobile} from "./components/heder-desktop-and-mobile/HeaderDesktopAndMobile";
import MoviesList from "./components/movies-list/MoviesList";
import TVShowsList from "./components/tv-shows-list/TVShowsList";
import MovieTVShowDetails from "./components/movie-tv-show-details/MovieTVShowDetails";
import MoviesTVShowsByGenre from "./components/movies-tv-shows-by-genre/MoviesTVShowsByGenre";
import {FoundMoviesList} from "./components/found-movies-list/FoundMoviesList";
import Watchlist from "./components/watchlist/Watchlist";
import {AboutUs} from "./components/about-us/AboutUs";
import {NotFoundPage} from "./components/not-found-page/NotFoundPage";
import {Footer} from "./components/footer/Footer";
import './MainPage.scss';

class MainPage extends Component {
    state = {
        isMovieSearch: false,
        errorSearch: '',
        searchTerm: '',
        totalResults: 0,
        currentPage: 1,
    }

    handleChange = (e) => {
        this.setState({searchTerm: e.target.value})
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        if (this.state.searchTerm === '') return;
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
                    currentPage: 1
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

    render() {
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
                                        <Redirect from="/" to="/movies" exact/>

                                        <Route path="/movies" exact>
                                            <MoviesList/>
                                        </Route>

                                        <Route path="/movies/genre/:gId/:movieType/:id"
                                               render={(routerProps) => {
                                                   return (<MovieTVShowDetails {...routerProps} />);
                                               }}
                                        />

                                        <Route path="/movies/genre/:id"
                                               render={(routerProps) => {
                                                   return (<MoviesTVShowsByGenre {...routerProps} />);
                                               }}
                                        />

                                        <Route path="/movies/:movieType/:id"
                                               render={(routerProps) => {
                                                   return (<MovieTVShowDetails {...routerProps} />);
                                               }}
                                        />

                                        <Route path="/tv-shows" exact>
                                            <TVShowsList/>
                                        </Route>

                                        <Route path="/tv-shows/genre/:gId/:movieType/:id"
                                               render={(routerProps) => {
                                                   return (<MovieTVShowDetails {...routerProps} />);
                                               }}
                                        />

                                        <Route path="/tv-shows/genre/:id"
                                               render={(routerProps) => {
                                                   return (<MoviesTVShowsByGenre {...routerProps} flag/>);
                                               }}
                                        />

                                        <Route path="/tv-shows/:movieType/:id"
                                               render={(routerProps) => {
                                                   return (<MovieTVShowDetails {...routerProps} />);
                                               }}
                                        />

                                        <Route path="/found-movies/:movieType/:id"
                                               render={(routerProps) => {
                                                   return (<MovieTVShowDetails {...routerProps} />);
                                               }}
                                        />

                                        <Route path="/found-movies" exact>
                                            <FoundMoviesList movies={this.props.foundMovies}
                                                             isLoading={this.state.isMovieSearch}
                                                             error={this.state.errorSearch}
                                                             totalResults={this.state.totalResults}
                                                             nextP={this.nextPage}
                                                             currentPage={this.state.currentPage}
                                                             searchTerm={this.state.searchTerm}
                                                             flag/>
                                        </Route>

                                        <Route path="/watchlist" exact>
                                            <Watchlist/>
                                        </Route>

                                        <Route path="/watchlist/:movieType/:id"
                                               render={(routerProps) => {
                                                   return (<MovieTVShowDetails {...routerProps} />);
                                               }}
                                        />

                                        <Route path="/watchlist/:movieType/:id"
                                               render={(routerProps) => {
                                                   return (<MovieTVShowDetails {...routerProps} />);
                                               }}
                                        />

                                        <Route path="/about-us" exact>
                                            <AboutUs/>
                                        </Route>

                                        <Route path="*">
                                            <NotFoundPage/>
                                        </Route>

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
    return {foundMovies: moviesReducer.foundMovies}
};

const mapDispatchToProps = ({searchMovies});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
