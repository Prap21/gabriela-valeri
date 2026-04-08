import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

export const Sidebar = ({ isOpen, toggleSidebar }) => {

  const scrollToCollection = () => {
    // Find the element with the id "collection-container"
    const collectionSection = document.getElementById('collection-container');
    
    // Check if the element exists before calling scrollIntoView
    if (collectionSection) {
      collectionSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.warn('Collection section not found!');
    }
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      {/* Close button */}
      <a id="close-button" className="close-btn" onClick={toggleSidebar}>
        <i className="fa-solid fa-xmark" id="close-icon"></i>
        <span id="close-text">Close</span>
      </a>

      {/* Sidebar Content */}
      <a href="#collection-container" onClick={scrollToCollection}>
        <h2>Collection</h2>
      </a>

      <ul>
        <li><a href="#">Νέες Αφίξεις</a></li>
      </ul>

      {/* Categories */}
      <Link to="/category/Γυναικεία">
        <h2>Κατηγορίες</h2>
      </Link>

      {/* 'Γυναικεία' category */}
      <Link to="/category/Γυναικεία" className="sidebar-h3">
        <h3>Γυναικεία</h3>
      </Link>
      <ul>
        <li><Link to="/category/Γόβες">Γόβες</Link></li>
        <li><Link to="/category/Μποτάκια">Μποτάκια</Link></li>
        <li><Link to="/category/Μπότες">Μπότες</Link></li>
        <li><Link to="/category/Πέδιλα">Πέδιλα</Link></li>
        <li><Link to="/category/Loafers">Loafers</Link></li>
        <li><Link to="/category/Flat">Flat</Link></li>
        <li><Link to="/category/Παντόφλες">Παντόφλες</Link></li>
        <li><Link to="/category/Μπαλαρίνες">Μπαλαρίνες</Link></li>
        <li><Link to="/category/Mules">Mules</Link></li>
        <li><Link to="/category/Sneakers">Sneakers</Link></li>
        <li><Link to="/category/Νυφικά">Νυφικά</Link></li>
      </ul>

      {/* 'Ανδρικά' category */}
      <Link to="/category/Ανδρικά" className="sidebar-h3">
        <h3>Ανδρικά</h3>
      </Link>
      <ul>
        <li><Link to="/category/Ανδρικά-Sneakers">Sneakers</Link></li>
        <li><Link to="/category/Ανδρικά-Σκαρπίνια">Σκαρπίνια</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
