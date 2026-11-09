import React from 'react';
import { Link } from 'react-router';
import './Sidebar.css';

export const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <nav
      id="store-sidebar"
      className={`sidebar ${isOpen ? 'open' : ''}`}
      aria-label="Store categories"
      aria-hidden={!isOpen}
    >
      {/* Close button */}
      <button id="close-button" type="button" className="close-btn" onClick={toggleSidebar} aria-label="Close shop menu">
        <i className="fa-solid fa-xmark" id="close-icon"></i>
        <span id="close-text">Close</span>
      </button>

      <Link to="/#collection-container" onClick={toggleSidebar}>
        <h2>Collection</h2>
      </Link>

      <ul>
        <li><Link to="/#collection-container" onClick={toggleSidebar}>Νέες Αφίξεις</Link></li>
      </ul>

      {/* Categories */}
      <Link to="/category/Γυναικεία" onClick={toggleSidebar}>
        <h2>Κατηγορίες</h2>
      </Link>

      {/* 'Γυναικεία' category */}
      <Link to="/category/Γυναικεία" className="sidebar-h3" onClick={toggleSidebar}>
        <h3>Γυναικεία</h3>
      </Link>
      <ul>
        <li><Link to="/category/Γόβες" onClick={toggleSidebar}>Γόβες</Link></li>
        <li><Link to="/category/Μποτάκια" onClick={toggleSidebar}>Μποτάκια</Link></li>
        <li><Link to="/category/Μπότες" onClick={toggleSidebar}>Μπότες</Link></li>
        <li><Link to="/category/Πέδιλα" onClick={toggleSidebar}>Πέδιλα</Link></li>
        <li><Link to="/category/Loafers" onClick={toggleSidebar}>Loafers</Link></li>
        <li><Link to="/category/Flat" onClick={toggleSidebar}>Flat</Link></li>
        <li><Link to="/category/Παντόφλες" onClick={toggleSidebar}>Παντόφλες</Link></li>
        <li><Link to="/category/Μπαλαρίνες" onClick={toggleSidebar}>Μπαλαρίνες</Link></li>
        <li><Link to="/category/Mules" onClick={toggleSidebar}>Mules</Link></li>
        <li><Link to="/category/Sneakers" onClick={toggleSidebar}>Sneakers</Link></li>
        <li><Link to="/category/Νυφικά" onClick={toggleSidebar}>Νυφικά</Link></li>
      </ul>

      {/* 'Ανδρικά' category */}
      <Link to="/category/Ανδρικά" className="sidebar-h3" onClick={toggleSidebar}>
        <h3>Ανδρικά</h3>
      </Link>
      <ul>
        <li><Link to="/category/Ανδρικά-Sneakers" onClick={toggleSidebar}>Sneakers</Link></li>
        <li><Link to="/category/Ανδρικά-Σκαρπίνια" onClick={toggleSidebar}>Σκαρπίνια</Link></li>
      </ul>
    </nav>
  );
};

export default Sidebar;
