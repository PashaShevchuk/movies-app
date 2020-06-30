import React, {Component} from 'react';
import {connect} from "react-redux";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from "react-router-dom";
import {Header} from "./components/header/Header";
import {MoviesList} from "./components/movies-list/MoviesList";
import {Pagination} from "./components/pagination/Pagination";
import {AboutUs} from "./components/about-us/AboutUs";
import {Footer} from "./components/footer/Footer";
import {searchMovies, getMovies} from "./actions";
import {apiKey} from "./constants";

class MainPage extends Component {
    state = {
        isLoading: false,
        error: '',
        isMovieSearch: false,
        errorSearch: '',
        searchTerm: '',
        totalResults: 0,
    }

    componentDidMount() {
        this.loadMovies();
    }

    loadMovies = async () => {
        const {getMovies} = this.props;
        this.setState({isLoading: true});
        // let response = await fetch(`https://api.themoviedb.org/3/discover/tv/?api_key=${apiKey}`); * for TV series *
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
        window.scrollTo(0, 0);
    }

    render() {
        let numberPages = Math.floor(this.state.totalResults / 20);

        return (
            <Router>

                <Header searchTerm={this.state.searchTerm}
                        handleSubmit={this.handleSubmit}
                        handleChange={this.handleChange}
                />

                <Switch>

                    <Route path="/movies" exact>
                        <MoviesList
                            movies={this.props.movies}
                            isLoading={this.state.isLoading}
                            error={this.state.error}
                        />
                    </Route>

                    <Route path="/found-movies">
                        <MoviesList
                            movies={this.props.foundMovies}
                            isLoading={this.state.isMovieSearch}
                            error={this.state.errorSearch}
                        />
                        {
                            (this.state.totalResults > 20 && this.state.currentMovie === null)
                                ? <Pagination pages={numberPages}
                                              nextPage={this.nextPage}
                                              currentPage={this.state.currentPage}/>
                                : ''
                        }
                    </Route>

                    <Route path="/about-us">
                        <AboutUs/>
                    </Route>

                    <Redirect from="/" to="/movies" exact/>

                </Switch>

                <Footer/>

            </Router>
        );
    }
}


const mapStateToProps = (store) => {
    const {moviesReducer} = store;
    return {
        movies: moviesReducer.movies,
        foundMovies: moviesReducer.foundMovies
    }
};

const mapDispatchToProps = ({
    getMovies,
    searchMovies
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
