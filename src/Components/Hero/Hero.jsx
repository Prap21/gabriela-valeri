import React, { useState } from 'react';
import './Hero.css';
import galleryImgs from '../Assets/gallery img/gallery.js';

export const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const allSets = [galleryImgs.slice(0, 3), galleryImgs.slice(3)];

  // Dynamic text content
  const titleText = currentIndex === 0 ? 'New Season Shoes' : 'Hottest Pieces of the Season';
  const descriptionText =
    currentIndex === 0
      ? 'Check out the latest collection of shoes for the new season.'
      : 'Discover the most popular and trending shoes of the season.';

  return (
    <div className="hero">
      <div className="hero-overlay active" key={currentIndex}>
        <h1 className="hero-title">{titleText}</h1>
        <p className="hero-description">{descriptionText}</p>
        <button
          type="button"
          className="cta-button"
          onClick={() => document.getElementById('collection-container')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Shop Now
        </button>
      </div>

      {allSets.map((set, index) => (
        <div
          key={index}
          className={`hero-images ${currentIndex === index ? 'active' : 'inactive'}`}
        >
          {set.map(({ id, img }) => (
            <img key={id} src={img} alt={`Hero ${id}`} className="hero-image" />
          ))}
        </div>
      ))}

      <div className="hero-buttons">
        <button
          type="button"
          aria-label="Show new season collection"
          className={`hero-button ${currentIndex === 0 ? 'active' : ''}`}
          aria-pressed={currentIndex === 0}
          onClick={() => setCurrentIndex(0)}
        />
        <button
          type="button"
          aria-label="Show season highlights"
          className={`hero-button ${currentIndex === 1 ? 'active' : ''}`}
          aria-pressed={currentIndex === 1}
          onClick={() => setCurrentIndex(1)}
        />
      </div>
    </div>
  );
};

export default Hero;
