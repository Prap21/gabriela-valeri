import React from 'react';
import './Navbar.css';
import logo from '../Assets/logo/gabriela valeri.jpg';
import { Link } from 'react-router';
import { useCart } from '../../Context/CartContext';

const Navbar = ({ toggleSidebar, isSidebarOpen }) => {
  const { totalItems } = useCart();

  return (
    <header className="navbar">
      <div className="nav-left">
        <button
          type="button"
          className="menu"
          onClick={toggleSidebar}
          aria-label="Toggle shop menu"
          aria-expanded={isSidebarOpen}
          aria-controls="store-sidebar"
        >
          <i className="fa-solid fa-bars" aria-hidden="true" />
          <span>Menu</span>
        </button>
      </div>
      <Link className="nav-logo" to="/" aria-label="Gabriela Valeri home">
        <img src={logo} alt="Gabriela Valeri" />
      </Link>
      <nav className="nav-right" aria-label="Shop tools">
        <ul>
          <li>
            <Link
              to="/cart"
              className="cart-link"
              aria-label={totalItems ? `Shopping bag, ${totalItems} items` : 'Shopping bag'}
            >
              <i className="fa-solid fa-bag-shopping" aria-hidden="true" />
              {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
            </Link>
          </li>
          <li>
            <Link to="/#communication" aria-label="Contact the shop">
              <i className="fa-regular fa-envelope" aria-hidden="true" />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
