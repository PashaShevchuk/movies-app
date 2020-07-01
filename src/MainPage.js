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
        // For movies
        isLoading: false,
        error: '',
        movieTotalResults: 0,
        movieCurrentPage: 1,

        // To search movies
        isMovieSearch: false,
        errorSearch: '',
        searchTerm: '',
        totalResults: 0,
        currentPage: 1,
        currentMovie: null
    }

    componentDidMount() {
        this.loadMovies();
    }

//=================================== For movies =======================================================================

    loadMovies = async () => {
        const {getMovies} = this.props;
        this.setState({isLoading: true});
        // let response = await fetch(`https://api.themoviedb.org/3/discover/tv/?api_key=${apiKey}`); * for TV series *
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
        let movieNumberPages = Math.floor(this.state.movieTotalResults / 20); // For movies
        let numberPages = Math.floor(this.state.totalResults / 20);           // To search movies

        return (
            <Router>

                <Header searchTerm={this.state.searchTerm}
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
                            (this.state.movieTotalResults > 20 && this.state.currentMovie === null)
                                ? <Pagination pages={movieNumberPages}
                                              nextPage={this.movieNextPage}
                                              currentPage={this.state.movieCurrentPage}/>
                                : ''
                        }
                    </Route>

                    <Route path="/found-movies">
                        <MoviesList movies={this.props.foundMovies}
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
