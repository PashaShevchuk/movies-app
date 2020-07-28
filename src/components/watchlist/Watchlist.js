import React, {useEffect} from "react";
import {connect} from "react-redux";
import {Panel} from "../panel/Panel";
import MovieCard from "../movie-card/MovieCard";
import TVShowCard from "../tv-show-card/TVShowCard";
import './Watchlist.scss'

const Watchlist = (props) => {
    const {watchlist, watchlistTVShow} = props;
    useEffect(() => window.scrollTo(0, 0));

    console.log('watchlist', watchlist);
    console.log('watchlistTVShow', watchlistTVShow);

    return (
        <div className="container watchlist-container">
            <h4>My watchlist</h4>
            <Panel label={`Movies: ${watchlist.length}`}>
                <div className="watchlist">
                    {
                        !!watchlist.length && watchlist.map(item => <MovieCard movie={item} key={item.id}/>)
                    }
                </div>
            </Panel>

            <Panel label={`TV Shows: ${watchlistTVShow.length}`}>
                <div className="watchlist">
                    {
                        !!watchlistTVShow.length && watchlistTVShow.map(item => <TVShowCard tvShow={item} key={item.id}/>)
                    }
                </div>
            </Panel>
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
