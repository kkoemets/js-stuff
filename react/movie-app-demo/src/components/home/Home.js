import React, {Component} from 'react';
import './Home.css';
import BottomScrollListener from 'react-bottom-scroll-listener';
import HeroImage from '../heroImage/HeroImage';
import SearchBar from '../searchBar/SearchBar';
import FourColGrid from '../fourColGrid/FourColGrid';
import Spinner from '../spinner/Spinner';
import {API_KEY, API_URL, BACKDROP_SIZE, IMAGE_BASE_URL, LANGUAGE, POSTER_SIZE} from '../../apiConfig/config';
import MovieThumb from '../movieThumb/MovieThumb';
import NothingToLoadText from '../loadMoreBtn/NothingToLoadText';

const NO_IMAGE = require('../../images/no_image.jpg');

class Home extends Component {
    state = {
        movies: [],
        heroImage: null,
        loading: false,
        currentPage: 0,
        totalPages: 0,
        searchTerm: ''
    };

    componentDidMount() {
        this.setState({
            loading: true
        });
        const endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&${LANGUAGE}&page=1`;
        this.fetchItems(endPoint);
    }

    loadMoreItems = () => this.setState({loading: true}, () => {
        const {currentPage, searchTerm} = this.state;
        const page = currentPage + 1;
        const endPoint = !searchTerm ?
            `${API_URL}movie/popular?api_key=${API_KEY}&${LANGUAGE}&page=${page}` :
            `${API_URL}search/movie?api_key=${API_KEY}&${LANGUAGE}&query=${searchTerm}&page=${page}`;
        this.fetchItems(endPoint);
    });

    searchItems = searchTerm => this.setState({
            movies: [],
            loading: true,
            searchTerm
        }
        , () => {
            const endPoint = !searchTerm ?
                `${API_URL}movie/popular?api_key=${API_KEY}&${LANGUAGE}&page=1` :
                `${API_URL}search/movie?api_key=${API_KEY}&${LANGUAGE}&query=${searchTerm}`;
            this.fetchItems(endPoint);
        });

    fetchItems = endPoint => fetch(endPoint)
        .then(result => result.json())
        .then(result => this.setState(prevState => {
            return ({
                movies: [...prevState.movies, ...result.results],
                heroImage: prevState.heroImage || result.results[0],
                loading: false,
                currentPage: result.page,
                totalPages: result.total_pages
            });
        }));

    render() {
        const {loadMoreItems, searchItems} = this;
        const {heroImage, searchTerm, loading, movies, currentPage, totalPages} = this.state;

        const isMoreData = currentPage <= totalPages;
        return <BottomScrollListener onBottom={isMoreData && !loading ? loadMoreItems :
            () => null}>
            <div className='rmdb-home'>
                {heroImage ?
                    <div>
                        <HeroImage image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${heroImage.backdrop_path}`}
                                   title={heroImage.original_title}
                                   text={heroImage.overview}/>
                        <SearchBar callback={searchItems}/>
                    </div> : null}
                <div className='rmdb-home-grid'>
                    <FourColGrid header={searchTerm ? 'Search result' : 'Popular movies'}
                                 loading={loading}>
                        {movies.map(movie => <MovieThumb key={movie.id}
                                                              clickable
                                                              image={movie.poster_path ?
                                                                  `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}` :
                                                                  NO_IMAGE}
                                                              movieId={movie.id}
                                                              movieName={movie.original_title}/>)}
                    </FourColGrid>
                    {loading ? <Spinner/> : null}
                </div>
            </div>
            {!isMoreData && !loading ? <NothingToLoadText text='Nothing to load'/> : null}
        </BottomScrollListener>;
    }
}

export default Home;