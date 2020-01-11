import React, {Component} from 'react';
import './Home.css';
import HeroImage from '../heroImage/HeroImage';
import SearchBar from '../searchBar/SearchBar';
import FourColGrid from '../fourColGrid/FourColGrid';
import Spinner from '../spinner/Spinner';
import LoadMoreBtn from '../loadMoreBtn/LoadMoreBtn';
import {API_KEY, API_URL} from '../../apiConfig/config';

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
        const endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        this.fetchItems(endPoint);
    }

    fetchItems = endPoint => fetch(endPoint)
        .then(result => result.json())
        .then(result => this.setState(prevState => ({
            movies: [...prevState.movies, ...result.results]
        })));

    render() {
        return <div className='rmdb-home'>
            <HeroImage/>
            <SearchBar/>
            <FourColGrid/>
            <Spinner/>
            <LoadMoreBtn/>
        </div>
    }
}

export default Home;