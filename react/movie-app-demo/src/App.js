import React from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import Header from './components/header/Header';
import Home from './components/home/Home';

function App() {
    return <BrowserRouter basename='/home'>
        <Header/>
        <Home/>
    </BrowserRouter>

}

export default App;
