import React from 'react';
import './stroganoff_map.css';

const StroganoffMap = () => {
  return (
    <div className="stroganoff-map">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Global Stroganoff Price Map
      </h2>
      <div className="bg-gray-50 rounded-lg overflow-hidden">
        <iframe
          title="Stroganoff Price Map"
          src="https://public.tableau.com/views/MarketBasket_17389650853120/Sheet1?:embed=y&:showVizHome=no"
          className="w-full h-[600px] md:h-[700px] border-0"
        ></iframe>
      </div>
    </div>
  );
};

export default StroganoffMap;
