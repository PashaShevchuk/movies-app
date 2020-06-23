import React, {Component} from 'react';
import {connect} from "react-redux";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Header} from "./components/header/Header";
import FoundMovies from './components/found-movies/FoundMovies'
import MoviesList from "./components/movies-list/MoviesList";
import {Pagination} from "./components/pagination/Pagination";
import {searchMovies} from "./actions";
import {apiKey} from "./constants";

class MainPage extends Component {
    state = {
        searchTerm: '',
        totalResults: 0,
        currentPage: 1,
        currentMovie: null
    }

    handleChange = (e) => {
        this.setState({searchTerm: e.target.value})
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        const {searchMovies} = this.props;
        let response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${this.state.searchTerm}`);
        if (response.ok) {
            let json = await response.json();
            this.setState({totalResults: json.total_results})
            const {results} = json;
            if (Array.isArray(results)) {
                searchMovies(results)
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
    }

    render() {
        let numberPages = Math.floor(this.state.totalResults / 20);
        return (
            <Router>
                <Header handleSubmit={this.handleSubmit} handleChange={this.handleChange}/>
                {
                    (this.state.totalResults > 20 && this.state.currentMovie === null)
                        ? <Pagination pages={numberPages}
                                      nextPage={this.nextPage}
                                      currentPage={this.state.currentPage}/>
                        : ''
                }
                <FoundMovies/>
                <Switch>
                    <Route path="/" exact>
                        <MoviesList/>
                    </Route>
                </Switch>
            </Router>
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
    searchMovies
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);