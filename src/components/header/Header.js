import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {apiKey, links} from "../../constants";
import logo from './logo512.png';
import {SearchField} from "../search-field/SearchField";
import './Header.scss';
import {searchMovies} from "../../actions";
import {connect} from "react-redux";

class Header extends Component {
    state = {
        totalResults: 0,
        searchTerm: '',
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
        await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${this.state.searchTerm}&language=en-US&page=${pageNumber}`)
            .then(data => data.json())
            .then(data => {
                this.setState({totalResults: data.total_results, currentPage: pageNumber})
                searchMovies(data);
            })
    }

    render() {
        return (
            <div className="header navbar">
                <img src={logo} className="header-logo" alt="logotype"/>
                <div className="header-links-wrapper">
                    {
                        links.map(item => {
                            return (
                                <div className="nav-item" key={item.url}>
                                    <Link
                                        to={item.url}
                                        className="header-links-wrapper-link nav-link"
                                    >
                                        {item.name}
                                    </Link>
                                </div>
                            );
                        })
                    }
                    <SearchField handleSubmit={this.handleSubmit} handleChange={this.handleChange}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (store) => {
    const {moviesReducer} = store;
    return {
        foundMovies: moviesReducer.foundMovies,
    }
};

const mapDispatchToProps = ({
    searchMovies
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);