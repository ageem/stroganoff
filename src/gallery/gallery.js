import React from "react";

// Dynamically load all .jfif files from the folder
const importAll = (r) => r.keys().map(r);
const images = importAll(require.context('./stroganoff_pics', false, /\.(jfif)$/));

const Gallery = () => {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "16px" }}>
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Gallery ${index}`}
          style={{ width: "100%", height: "auto" }}
        />
      ))}
    </div>
  );
};

export default Gallery;
