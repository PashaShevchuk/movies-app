import React from 'react';
import {Provider} from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import {Header} from "./components/header/Header";
import MoviesList from "./components/movies-list/MoviesList";
import {moviesStore} from "./store";

import './App.css';

export function App() {
    return (
        <Provider store={moviesStore}>
            <Router>
                <Header/>
                <Switch>
                    <Route path="/" exact>
                        <MoviesList/>
                    </Route>
                </Switch>
            </Router>
        </Provider>
    );
}