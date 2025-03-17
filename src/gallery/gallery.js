import React, { useState } from "react";
import './gallery.css';

// Dynamically load all .jfif files from the folder
const importAll = (r) => r.keys().map(r);
const images = importAll(require.context('./stroganoff_pics', false, /\.(jfif)$/));

const Gallery = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Strogan<span className="text-amber-600">off</span> Gallery
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            A collection of mouthwatering stroganoff dishes from around the world
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((image, index) => (
            <div 
              key={index}
              className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="aspect-w-1 aspect-h-1 w-full">
                <img
                  src={image}
                  alt={`Stroganoff Gallery ${index + 1}`}
                  className="w-full h-full object-cover object-center transform transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
