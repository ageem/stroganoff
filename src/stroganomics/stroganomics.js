import './stroganomics.css';
import React from 'react';
import StroganoffIndex from './stroganoff_index/stroganoff_index';

function Stroganomics(){
    return(
        <div className='stroganomics'>
            <h1>Stroganomics</h1>
            <div>
                <StroganoffIndex/>
            </div>
        </div>
    );
}

export default Stroganomics;