import React, {Component} from 'react';
import {apiKey} from "../../constants";
import {FetchError} from "../fetch-error/FetchError";

export class MovieDetails extends Component {
    state = {
        movie: null,
        isLoading: false,
        error: ''
    }

    componentDidMount() {
        this.loadMovie();
    }

    loadMovie = async () => {
        const {match: {params: {id}}} = this.props;
        this.setState({isLoading: true});
        let response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`);
        if (response.ok) {
            let result = await response.json();
            if (typeof (result) === 'object') {
                this.setState({
                    isLoading: false,
                    error: '',
                    movie: result
                });
            }
        } else {
            this.setState({
                isLoading: false,
                error: response.status
            });
        }
    };

    render() {
        const {movie, isLoading, error} = this.state;
        console.log(movie);
        return (
            <div>
                <div>Movie Details Page</div>
                {
                    isLoading && (
                        <div className="text-center m-2">
                            <div className="spinner-border text-secondary" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>)
                }

                {
                    !!error && (<FetchError error={error}/>)
                }
            </div>
        );
    }
}
