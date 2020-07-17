import React from "react";
import {Link} from 'react-router-dom';
import {genresForRender} from "../../constants/index";
import {withRouter} from "react-router";

const Genres = (props) => {
    const {match: {url}} = props;

    return (
        <div>
            {
                genresForRender.map(genre => <div key={genre.id}>
                    <Link to={`${url}/genre/${genre.id}`}>{genre.name}</Link>
                </div>)
            }
        </div>
    );
};

export default withRouter(Genres);
