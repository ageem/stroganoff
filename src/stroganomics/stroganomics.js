import './stroganomics.css';
import React from 'react';
import StroganoffIndex from './stroganoff_index/stroganoff_index';
import StroganoffMap from './stroganoff_map/stroganoff_map';

function Stroganomics(){
    return(
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-8">
                    Strogan<span className="text-amber-600">omics</span>
                </h1>
                
                <div className="space-y-8">
                    <section className="bg-white rounded-lg shadow-lg p-6">
                        <StroganoffIndex/>
                    </section>

                    <section className="bg-white rounded-lg shadow-lg p-6">
                        <StroganoffMap/>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default Stroganomics;