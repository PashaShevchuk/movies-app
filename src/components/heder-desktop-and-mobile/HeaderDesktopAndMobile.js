import React from "react";
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router';
import {BurgerMenu} from "./BurgerMenu";
import logo from "../../assets/app-logo.png";

const HeaderDesktopAndMobileComponent = (props) => {
    const {history, handleSubmit, handleChange, searchTerm} = props;
    const toFoundMovies = () => {
        if (searchTerm === '') return;
        history.push('/found-movies');
    };
    return (
        <div className="header navbar">
            <div className="container">

                <div>
                    <Link to="/movies">
                        <img src={logo} className="header-logo" alt="logotype"/>
                    </Link>
                </div>

                <BurgerMenu handleSubmit={handleSubmit}
                            handleChange={handleChange}
                            toFoundMovies={toFoundMovies}
                />

            </div>
        </div>
    );
};

export const HeaderDesktopAndMobile = withRouter(HeaderDesktopAndMobileComponent);
