import React from "react";
import {withRouter} from "react-router";
import {Link} from 'react-router-dom';
import './NotFoundPage.scss';

const NotFoundPageComponent = (props) => {
    const goBack = () => {
        props.history.go(-1);
    };
    return (
        <div className="not-found-page-container">
            <div className="boo-wrapper">
                <div className="boo">
                    <div className="face"/>
                </div>
                <div className="shad"/>
                <h1>Whoops!</h1>
                <p>We couldn't find the page you <br/>were looking for. </p>
                <div className="link-container">
                    <div onClick={goBack}>GO BACK |</div>
                    <Link to="/movies" className="not-found-page-link">
                        <div>&nbsp;GO TO HOME PAGE</div>
                    </Link>
                </div>

            </div>
        </div>
    )
};

export const NotFoundPage = withRouter(NotFoundPageComponent);
