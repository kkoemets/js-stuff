import React from 'react';
import './Header.css';

const MOVIE_LOGO = require('../../images/reactMovie_logo.png');
const THE_MOVIE_DB_LOGO = require('../../images/tmdb_logo.png');

const Header = () => <div className='rmdb-header'>
    <div className='rmdb-header-content'>
        <img className='rmdb-logo' src={MOVIE_LOGO} alt='rmdb-logo'/>
        <img className='rmdb-tmdb-logo' src={THE_MOVIE_DB_LOGO} alt='tmdb-logo'/>
    </div>
</div>;
export default Header;