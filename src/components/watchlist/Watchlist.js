import React from "react";
import {connect} from "react-redux";

const Watchlist = (props) => {
    const {watchlist} = props;
    console.log(watchlist);

    return (
        <div>watchlist</div>
    );
};

const mapStateToProps = (store) => {
    const {moviesReducer} = store;
    return {
        watchlist: moviesReducer.watchlist
    }
};

export default connect(mapStateToProps, null)(Watchlist);
