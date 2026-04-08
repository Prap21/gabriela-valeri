// src/Pages/Home.jsx
import React from 'react';
import Hero from '../Components/Hero/Hero';
import Collection from '../Components/Collection/Collection';
import Footer from '../Components/Footer/Footer';

const Home = () => {
  
  return (
    <div>
      <Hero />
      <div id="collection-container">
        <Collection />
      </div>      
      <Footer />
    </div>
  );
}

export default Home;
