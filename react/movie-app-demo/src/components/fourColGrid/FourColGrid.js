import './FourColGrid.css';
import React from 'react';

const FourColGrid = ({header, loading, children}) => {
    const renderElements = () => children.map((element, i) => <div key={i}
                                                                   className='rmdb-grid-element'>{element}</div>);

    return <div className='rmdb-grid'>
        {header && !loading ? <h1>{header}</h1> : null}
        <div className='rmdb-grid-content'>
            {renderElements()}
        </div>
    </div>;
};
export default FourColGrid;