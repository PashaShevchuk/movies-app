import React from "react";
import {DarkThemeContext} from "../../context/DarkThemeContext";
import searchIcon from '../../assets/search-icon.png'
import './SearchField.scss';

export const SearchField = (props) => {
    return (
        <DarkThemeContext.Consumer>
            {
                (value) => {
                    const {isDarkTheme} = value;
                    return (
                        <div className="wrap">
                            <form className="search" action="" onSubmit={props.handleSubmit}>
                                <input type="text"
                                       className={`searchTerm${isDarkTheme ? '-black' : ''}`}
                                       placeholder="Search movies"
                                       onChange={props.handleChange}
                                />
                                <button type="submit"
                                        className="searchButton"
                                        onClick={props.toFoundMovies}
                                >
                                    <img src={searchIcon} alt="search icon"/>
                                </button>
                            </form>
                        </div>
                    )
                }
            }
        </DarkThemeContext.Consumer>
    );
};
