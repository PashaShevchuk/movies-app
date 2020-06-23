import React from 'react';
import './RadialProgressBar.scss'

export const RadialProgressBar = (props) => {
    const {rating} = props;
    const movieRating = rating * 10;
    const movieRatingRound = Math.round(rating) * 10;
    return (
        <div className="my-progress-bar">
            <div className={`pie-wrapper progress-${movieRatingRound} style-2`}>
                <span className="label">
                    {movieRating}<span className="smaller">%</span>
                </span>
                <div className="pie">
                    <div className="left-side half-circle"/>
                    <div className="right-side half-circle"/>
                </div>
                <div className="shadow"/>
            </div>
        </div>
    );
};