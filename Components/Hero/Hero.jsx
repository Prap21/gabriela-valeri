import React, { useState } from 'react';
import './Hero.css';
import galleryImgs from '../Assets/gallery img/gallery.js';

export const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTextChanging, setIsTextChanging] = useState(false); // New state for controlling text change


  // Divide gallery images into two sets
  const photosSet1 = galleryImgs.slice(0, 3); // First 4 images
  const photosSet2 = galleryImgs.slice(3); // Last 4 images

  const allSets = [photosSet1, photosSet2];

  // Function to change to Set 1
  const showSet1 = () => {
    // Start the text change process (after overlay starts disappearing)
    setIsTextChanging(true);
    setTimeout(() => {
      setCurrentIndex(0);
      setIsTextChanging(false);
    }, 300); // Delay the text change by 0.3s to match the overlay fade-out
  };

  // Function to change to Set 2
  const showSet2 = () => {
    // Start the text change process (after overlay starts disappearing)
    setIsTextChanging(true);
    setTimeout(() => {
      setCurrentIndex(1);
      setIsTextChanging(false);
    }, 300); // Delay the text change by 0.3s to match the overlay fade-out
  };

  // Dynamic text content
  const titleText = currentIndex === 0 ? 'New Season Shoes' : 'Hottest Pieces of the Season';
  const descriptionText =
    currentIndex === 0
      ? 'Check out the latest collection of shoes for the new season.'
      : 'Discover the most popular and trending shoes of the season.';

  return (
    <div className="hero">
      {/* Overlay for Set 1 */}
      <div className={`hero-overlay ${currentIndex === 0 ? 'active' : ''}`}>
        <h1 className={`hero-title ${currentIndex === 0 ? 'active' : ''}`}>{titleText}</h1>
        <p className={`hero-description ${currentIndex === 0 ? 'active' : ''}`}>{descriptionText}</p>
        <button className={`cta-button ${currentIndex === 0 ? 'active' : ''}`}>Shop Now</button>
      </div>

      {/* Overlay for Set 2 */}
      <div className={`hero-overlay ${currentIndex === 1 ? 'active' : ''}`}>
        <h1 className={`hero-title ${currentIndex === 1 ? 'active' : ''}`}>{titleText}</h1>
        <p className={`hero-description ${currentIndex === 1 ? 'active' : ''}`}>{descriptionText}</p>
        <button className={`cta-button ${currentIndex === 1 ? 'active' : ''}`}>Shop Now</button>
      </div>

      {/* Image Set Display */}
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

      {/* Navigation Buttons */}
      <div className="hero-buttons">
        <button
          className={`hero-button ${currentIndex === 0 ? 'active' : ''}`}
          onClick={showSet1}
        ></button>
        <button
          className={`hero-button ${currentIndex === 1 ? 'active' : ''}`}
          onClick={showSet2}
        ></button>
      </div>
    </div>
  );
};

export default Hero;
