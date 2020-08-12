import React from "react";
import {DarkThemeContext} from "../../context/DarkThemeContext";
import './DarkThemeSwitcher.scss';

export const DarkThemeSwitcher = () => {
    const goUp = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    };
    return (
        <DarkThemeContext.Consumer>
            {
                (value) => {
                    const {toggleTheme} = value;
                    return (
                        <div className="d-flex">
                            <div className="dark-theme-switcher-title">Dark mode:</div>
                            <label className="switch">
                                <input type="checkbox" onChange={toggleTheme} onClick={goUp}/>
                                <div className="slider round"/>
                                <div className="switch-on">ON</div>
                                <div className="switch-off">OFF</div>
                            </label>
                        </div>
                    )
                }
            }
        </DarkThemeContext.Consumer>
    )
};
