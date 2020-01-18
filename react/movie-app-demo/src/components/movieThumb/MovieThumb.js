import './MovieThumb.css';
import React from 'react';

const MovieThumb = ({image}) => <div className='rmdb-moviethumb'>
    <img src={image} alt='moviethumb'/>
</div>;
export default MovieThumb;