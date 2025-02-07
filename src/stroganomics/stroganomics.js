import './stroganomics.css';
import React from 'react';
import StroganoffIndex from './stroganoff_index/stroganoff_index';
import StroganoffMap from './stroganoff_map/stroganoff_map';

function Stroganomics(){
    return(
        <div className='stroganomics'>
            <h1>Stroganomics</h1>
            <div>
                <StroganoffIndex/>
            </div>
            <div>
                <StroganoffMap/>
            </div>
        </div>
    );
}

export default Stroganomics;