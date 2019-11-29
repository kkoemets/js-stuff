import React from 'react';
import './xmas-lights.css';

const XmasLights = props => {
    return <ul className="lightrope">
        {Array.from(Array(50).keys()).map(() => <li></li>)}
    </ul>
};
export default XmasLights;