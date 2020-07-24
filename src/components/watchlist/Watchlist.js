import React from "react";
import {connect} from "react-redux";
import MovieCard from "../movie-card/MovieCard";
import './Watchlist.scss'

const Watchlist = (props) => {
    const {watchlist, watchlistTVShow} = props;
    console.log('watchlist', watchlist);
    console.log('watchlistTVShow', watchlistTVShow);

    return (
        <div className="container">
            <h4>watchlist</h4>
            <div>You have {watchlist.length} movie</div>
            <div className="watchlist">
                {
                    !!watchlist.length && watchlist.map(item => <MovieCard movie={item} key={item.id}/>)
                }
            </div>
        </div>
    );
};

const mapStateToProps = (store) => {
    const {moviesReducer} = store;
    return {
        watchlist: moviesReducer.watchlist,
        watchlistTVShow: moviesReducer.watchlistTVShow
    }
};

export default connect(mapStateToProps, null)(Watchlist);
