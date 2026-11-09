// src/Pages/Home.jsx
import React from 'react';
import Hero from '../Components/Hero/Hero';
import Collection from '../Components/Collection/Collection';

const Home = () => {
  return (
    <div>
      <Hero />
      <div id="collection-container">
        <Collection />
      </div>      
    </div>
  );
}

export default Home;
