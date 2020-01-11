import React from 'react';
import './Header.css';

const Header = () => <div className='rmdb-header'>
    <div className='rmdb-header-content'>
        <img className='rmdb-logo' src={require('./images/reactMovie_logo.PNG')} alt='rmdb-logo'/>
        <img className='rmdb-tmdb-logo' src={require('./images/rmdb_logo.PNG')} alt='tmdb-logo'/>
    </div>
</div>;
export default Header;