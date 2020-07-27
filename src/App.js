import React from 'react';
import {Provider} from 'react-redux';
import {moviesStore} from "./store";
import MainPage from "./MainPage";

export function App() {
    return (
        <Provider store={moviesStore}>
            <MainPage/>
        </Provider>
    );
}
