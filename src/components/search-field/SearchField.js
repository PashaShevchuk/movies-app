import React from "react";
import searchIcon from '../../assets/search-icon.png'
import './SearchField.scss';

export const SearchField = (props) => {
    return (
        <div className="wrap">
            <form className="search" action="" onSubmit={props.handleSubmit}>
                <input type="text" className="searchTerm" placeholder="Search movie" onChange={props.handleChange}/>
                <button type="submit" className="searchButton">
                    <img src={searchIcon} alt="search icon"/>
                </button>
            </form>
        </div>
    );
};