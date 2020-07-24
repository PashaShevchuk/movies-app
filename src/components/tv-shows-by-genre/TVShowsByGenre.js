import React, {Component} from 'react';

class TvShowsByGenre extends Component {
    state = {
        tvShows: [],
        isLoading: false,
        error: '',
        tvShowTotalResults: 0,
        tvShowCurrentPage: 1,
    }

    componentDidMount() {
        this.loadTVShow();
    }

    loadTVShow = async () => {

    };

    render() {
        return (
            <div>
                test TVShowsByGenre
            </div>
        );
    }
}

export default TvShowsByGenre;
