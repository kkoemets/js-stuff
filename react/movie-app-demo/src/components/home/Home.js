import React, {Component} from 'react';
import './Home.css';
import HeroImage from '../heroImage/HeroImage';
import SearchBar from '../searchBar/SearchBar';
import FourColGrid from '../fourColGrid/FourColGrid';
import Spinner from '../spinner/Spinner';
import LoadMoreBtn from '../loadMoreBtn/LoadMoreBtn';
import {API_KEY, API_URL, BACKDROP_SIZE, IMAGE_BASE_URL, LANGUAGE} from '../../apiConfig/config';

class Home extends Component {
    state = {
        movies: [],
        heroImage: null,
        loading: false,
        currentPage: 0,
        totalPages: 0,
        searchTerm: ''
    };


    loadMoreItems = () => this.setState({loading: true}, () => {
        const {currentPage, searchTerm} = this.state;
        const page = currentPage + 1;
        const endPoint = !searchTerm ?
            `${API_URL}movie/popular?api_key=${API_KEY}&${LANGUAGE}&page=${page}` :
            `${API_URL}search/movie?api_key=${API_KEY}&${LANGUAGE}&query${searchTerm}&page=
            ${page}`;
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

    componentDidMount() {
        this.setState({
            loading: true
        });
        const endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&${LANGUAGE}&page=1`;
        this.fetchItems(endPoint);
    }

    fetchItems = endPoint => fetch(endPoint)
        .then(result => result.json())
        .then(result => this.setState(prevState => {
            console.log(result);
            return ({
                movies: [...prevState.movies, ...result.results],
                heroImage: prevState.heroImage || result.results[0],
                loading: false,
                currentPage: result.page,
                totalPages: result.total_pages
            });
        }));

    render() {
        const {heroImage} = this.state;
        return <div className='rmdb-home'>
            {heroImage ?
                <div>
                    <HeroImage image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${heroImage.backdrop_path}`}
                               title={heroImage.original_title}
                               text={heroImage.overview}/>
                    <SearchBar callback={this.searchItems}/>
                </div> : null}
            <FourColGrid/>
            <Spinner/>
            <LoadMoreBtn/>
        </div>
    }
}

export default Home;