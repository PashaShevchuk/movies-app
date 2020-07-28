import React from "react";
import {Link} from 'react-router-dom';
import {BurgerMenu} from "./BurgerMenu";
import logo from "../../assets/app-logo.png";
import './HeaderDesktopAndMobile.scss';

export const HeaderDesktopAndMobile = (props) => {
    const {handleSubmit, handleChange, searchTerm} = props;

    return (
        <div className="header navbar">
            <div className="container">

                <div className="d-flex align-items-center">
                    <Link to="/movies">
                        <img src={logo} className="header-logo" alt="logotype"/>
                    </Link>
                    <div className="header-name">MOVIES<br/>TIME</div>
                </div>

                <BurgerMenu handleSubmit={handleSubmit}
                            handleChange={handleChange}
                            searchTerm={searchTerm}
                />

            </div>
        </div>
    );
};