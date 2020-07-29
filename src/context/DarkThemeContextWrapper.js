import React, {useState} from 'react';
import {DarkThemeContext, isDarkTheme} from './DarkThemeContext';

export const DarkThemeContextWrapper = (props) => {
    const [darkTheme, setDarkTheme] = useState(isDarkTheme);
    const toggleDarkTheme = () => setDarkTheme(!darkTheme);
    const {children} = props;

    return (
        <DarkThemeContext.Provider value={{
            isDarkTheme: darkTheme,
            toggleTheme: toggleDarkTheme
        }}>
            {children}
        </DarkThemeContext.Provider>
    );
};
