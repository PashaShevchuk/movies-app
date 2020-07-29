import React from 'react';
import {DarkThemeContextWrapper} from "./context/DarkThemeContextWrapper";
import {Provider} from 'react-redux';
import {moviesStore} from "./store";
import MainPage from "./MainPage";

export function App() {
    return (
        <DarkThemeContextWrapper>
            <Provider store={moviesStore}>
                <MainPage/>
            </Provider>
        </DarkThemeContextWrapper>
    );
}
