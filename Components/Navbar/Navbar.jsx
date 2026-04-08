import React, { useContext, useState } from 'react';
import './Navbar.css';
import logo from '../Assets/logo/gabriela valeri.jpg';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';  // Correct import path
import { useCart } from '../../Context/CartContext';

export const Navbar = ({ toggleSidebar }) => {
  const { user, logout } = useContext(AuthContext);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { handleLogout, totalItems } = useCart(); // Access totalItems from CartContext

  const handleDropdownToggle = () => {
    setDropdownVisible(!dropdownVisible); 
  };

  return (
    <div className="navbar">
      <div className="nav-left">
        <ul>
          <li>
            <a className="menu" onClick={toggleSidebar}>
              <i className="fa-solid fa-bars" id="menu-icon"></i>
              <span id="menu-text">Menu</span>
            </a>
          </li>
        </ul>
      </div>
      <div className="nav-logo">
        <img src={logo} alt="Gabriela Valeri logo" />
      </div>
      <div className="nav-right">
        <ul>
          {user ? (
            <>
              <span className="user-name" onClick={handleDropdownToggle}>
                Welcome, <span>{user.username}</span>
                <i className={`fa-solid ${dropdownVisible ? 'fa-minus' : 'fa-angle-down'}`}></i>
              </span>
              <ul className={`dropdown-menu ${dropdownVisible ? 'show' : ''}`}>
                <li>
                  <button className="logout-btn" onClick={handleLogout}>Log Out</button>
                </li>
              </ul>
            </>
          ) : (
            <li>
              <Link to="/login" className="login-btn">Log In</Link>
            </li>
          )}
          <li>
            {/* Cart Link */}
            <Link to="/cart" className="cart-link">
              <i className="fa-solid fa-cart-shopping"></i>
              {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
            </Link>
          </li>
          <li>
            <Link to="/#communication">
              <i className="fa-regular fa-envelope"></i>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};


export default Navbar;
