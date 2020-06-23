import React from 'react';
import {Link} from 'react-router-dom';
import {links} from "../../constants";
import logo from './logo512.png';
import {SearchField} from "../search-field/SearchField";
import './Header.scss';

export const Header = (props) => {
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
                <SearchField handleSubmit={props.handleSubmit} handleChange={props.handleChange}/>
            </div>
        </div>
    );
};