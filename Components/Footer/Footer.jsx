import React, { useState } from 'react';
import './Footer.css';

export const Footer = () => {
    return (

    <footer className="footer" id="communication">
        <div className="footer-content">
            <h3>Επικοινωνία </h3>
    
            <div className="contact-info">
                <div className="contact-item">
                    <i className="fas fa-phone"></i>
                    <p>Τηλέφωνο: <a href="tel:+1234567890">2410230236</a></p>
                </div>
                <div className="contact-item">
                    <i className="fas fa-envelope"></i>
                    <p>Email: <a href="mailto:info@example.com">gabrielaValeri.com</a></p>
                </div>
                <div className="contact-item">
                    <i className="fas fa-map-marker-alt"></i>
                    <p>Τοποθεσία: <a href="https://www.google.com/maps/dir//%CE%9B%CE%B5%CF%89%CF%86.+%CE%9A%CE%B1%CF%81%CE%B1%CE%BC%CE%B1%CE%BD%CE%BB%CE%AE,+%CE%9B%CE%AC%CF%81%CE%B9%CF%83%CE%B1+413+36/@39.6472716,22.3537328,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x13588720a6f14617:0xbdf9b11a45a9601b!2m2!1d22.4361337!2d39.6473007?entry=ttu&g_ep=EgoyMDI0MTEwNi4wIKXMDSoASAFQAw%3D%3D">Λεωφ. Καραμανλή, Λάρισα 413 36</a></p>
                </div>
            </div>
        </div>

        <div className="footer-bottom">
            <p>&copy; 2024 Gabriela Valeri Shoes. All Rights Reserved.</p>
        </div>
    </footer>
    );
};
 
export default Footer;
