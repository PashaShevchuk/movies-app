import React from "react";
import {Link} from 'react-router-dom';
import {genres} from "../../constants/index";
import {withRouter} from "react-router";

const Genres = (props) => {
    const {match: {url}} = props;
    console.log(url);

    return (
        <div>
            {
                genres.map(genre => <div key={genre.id}>
                    <Link to={`${url}/genre/${genre.id}`}>{genre.name}</Link>
                </div>)
            }
        </div>
    );
};

export default withRouter(Genres);
