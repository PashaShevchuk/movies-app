import React from 'react';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router';
import {links} from "../../constants";
import logo from '../../assets/logo512.png';
import {SearchField} from "../search-field/SearchField";
import './Header.scss';

const HeaderComponent = (props) => {
    const {history, handleSubmit, handleChange, searchTerm} = props;
    const toFoundMovies = () => {
        if (searchTerm === '') return;
        history.push('/found-movies');
    };
    return (
        <div className="header navbar">
            <img src={logo} className="header-logo" alt="logotype"/>
            <div className="header-links-wrapper">
                {
                    links.map(item => {
                        return (
                            <div className="nav-item" key={item.url}>
                                <Link to={item.url} className="header-links-wrapper-link nav-link">{item.name}</Link>
                            </div>
                        );
                    })
                }
                <SearchField
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                    toFoundMovies={toFoundMovies}
                />
            </div>
        </div>
    );
};

export const Header = withRouter(HeaderComponent);
