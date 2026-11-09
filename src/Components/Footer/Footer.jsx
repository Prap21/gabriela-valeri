import React from 'react';
import { Link } from 'react-router';
import logo from '../Assets/logo/gabriela valeri.jpg';
import './Footer.css';

const Footer = () => (
  <footer className="site-footer" id="communication">
    <div className="site-footer__main">
      <section className="site-footer__brand" aria-label="About Gabriela Valeri">
        <Link className="site-footer__logo" to="/" aria-label="Gabriela Valeri home">
          <img src={logo} alt="Gabriela Valeri" />
        </Link>
        <p>Χειροποίητα υποδήματα με φροντίδα στη λεπτομέρεια και διαχρονικό στυλ.</p>
      </section>

      <nav className="site-footer__column" aria-label="Shop">
        <h2>Ανακάλυψε</h2>
        <Link to="/#collection-container">Νέες αφίξεις</Link>
        <Link to="/category/Γυναικεία">Γυναικεία</Link>
        <Link to="/category/Ανδρικά">Ανδρικά</Link>
        <Link to="/category/Νυφικά">Νυφικά</Link>
      </nav>

      <section className="site-footer__column site-footer__contact">
        <h2>Επικοινωνία</h2>
        <a href="tel:2410230236">
          <span>Τηλέφωνο</span>
          2410 230236
        </a>
        <a
          href="https://www.google.com/maps/dir/?api=1&destination=%CE%9B%CE%B5%CF%89%CF%86.+%CE%9A%CE%B1%CF%81%CE%B1%CE%BC%CE%B1%CE%BD%CE%BB%CE%AE%2C+%CE%9B%CE%AC%CF%81%CE%B9%CF%83%CE%B1+413+36"
          target="_blank"
          rel="noreferrer"
        >
          <span>Επισκέψου μας</span>
          Λεωφ. Καραμανλή, Λάρισα 413 36
        </a>
      </section>
    </div>

    <div className="site-footer__bottom">
      <p>© {new Date().getFullYear()} Gabriela Valeri. Με επιφύλαξη παντός δικαιώματος.</p>
    </div>
  </footer>
);

export default Footer;
