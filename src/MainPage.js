import React, {Component} from 'react';
import {connect} from "react-redux";
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import {apiKey} from "./constants";
import {searchMovies} from "./actions";
import {DarkThemeContext} from "./context/DarkThemeContext";
import {HeaderDesktopAndMobile} from "./components/heder-desktop-and-mobile/HeaderDesktopAndMobile";
import ListMovies from "./components/list-movies/ListMovies";
import ListTVShows from "./components/list-tv-shows/ListTVShows";
import MovieTVShowDetails from "./components/movie-tv-show-details/MovieTVShowDetails";
import MoviesTVShowsByGenre from "./components/movies-tv-shows-by-genre/MoviesTVShowsByGenre";
import {FoundMoviesList} from "./components/found-movies-list/FoundMoviesList";
import Watchlist from "./components/watchlist/Watchlist";
import {AboutUs} from "./components/about-us/AboutUs";
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
                                        <Route path="/movies" exact>
                                            <ListMovies/>
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
                                            <ListTVShows/>
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
                                                             flag
                                                             totalResults={this.state.totalResults}
                                                             nextP={this.nextPage}
                                                             currentPage={this.state.currentPage}

                                            />
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
        foundMovies: moviesReducer.foundMovies
    }
};

const mapDispatchToProps = ({
    searchMovies,
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
