import React, {Component} from 'react';
import {searchMovies} from "./actions";
import {connect} from "react-redux";

class MainPage extends Component {
    render() {
        return (
            <div>

            </div>
        );
    }
}

const mapStateToProps = (store) => {
    const {moviesReducer} = store;
    return {
        foundMovies: moviesReducer.foundMovies,
    }
};

const mapDispatchToProps = ({
    searchMovies
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);