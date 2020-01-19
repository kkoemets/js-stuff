import React, {useEffect, useState} from 'react';
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

const Home = () => {
    const [state, setState] = useState({movies: []});
    const [isLoading, setIsLoading] = useState(false);

    const fetchMovies = async endPoint => {
        setIsLoading(true);

        const params = new URLSearchParams(endPoint);
        if (!params.get('page')) {
            setState(prevState => ({
                ...prevState,
                movies: [],
            searchTerm: params.get('query')}));
        }

        const result = await (await fetch(endPoint)).json();
        setState(prevState => ({
            ...prevState,
            movies: [...prevState.movies, ...result.results],
            heroImage: prevState.heroImage || result.results[0],
            currentPage: result.page,
            totalPages: result.total_pages
        }));

        setIsLoading(false);
    };

    // for initial component mounting
    useEffect(() => {
        fetchMovies(`${API_URL}movie/popular?api_key=${API_KEY}`);
    }, []);

    const loadMoreItems = () => {
        const {currentPage, searchTerm} = state;
        const page = currentPage + 1;
        const endPoint = !searchTerm ?
            `${API_URL}movie/popular?api_key=${API_KEY}&${LANGUAGE}&page=${page}` :
            `${API_URL}search/movie?api_key=${API_KEY}&${LANGUAGE}&query=${searchTerm}&page=${page}`;
        fetchMovies(endPoint);
    };

    const searchItems = searchTerm => {
        const endPoint = !searchTerm ?
            `${API_URL}movie/popular?api_key=${API_KEY}&${LANGUAGE}&page=1` :
            `${API_URL}search/movie?api_key=${API_KEY}&${LANGUAGE}&query=${searchTerm}`;
        fetchMovies(endPoint);
    };

    const {heroImage, searchTerm, movies, currentPage, totalPages} = state;
    const isMoreData = currentPage <= totalPages;

    return <BottomScrollListener onBottom={isMoreData && !isLoading ? loadMoreItems :
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
                             loading={isLoading}>
                    {movies.map(movie => <MovieThumb key={movie.id}
                                                     clickable
                                                     image={movie.poster_path ?
                                                         `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}` :
                                                         NO_IMAGE}
                                                     movieId={movie.id}
                                                     movieName={movie.original_title}/>)}
                </FourColGrid>
                {isLoading ? <Spinner/> : null}
            </div>
        </div>
        {!isMoreData && !isLoading ? <NothingToLoadText text='Nothing to load'/> : null}
    </BottomScrollListener>;
};

export default Home;