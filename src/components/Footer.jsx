import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'; // Import the icons from react-icons/fa

const FooterComponent = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/privacy-policy" className="text-light text-decoration-none">Privacy Policy</Link></li>
              <li><Link to="/terms-conditions" className="text-light text-decoration-none">Terms & Conditions</Link></li>
              <li><Link to="/faq" className="text-light text-decoration-none">FAQ</Link></li>
            </ul>
          </div>

          <div className="col-md-4">
            <h5>Follow Us</h5>
            <ul className="list-unstyled">
              <li>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-light text-decoration-none">
                  <FaFacebook size={30} className="me-2" /> Facebook
                </a>
              </li>
              <li>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-light text-decoration-none">
                  <FaTwitter size={30} className="me-2" /> Twitter
                </a>
              </li>
              <li>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-light text-decoration-none">
                  <FaInstagram size={30} className="me-2" /> Instagram
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-light text-decoration-none">
                  <FaLinkedin size={30} className="me-2" /> LinkedIn
                </a>
              </li>
            </ul>
          </div>

          <div className="col-md-4">
            <h5>Contact Us</h5>
            <ul className="list-unstyled">
              <li><strong>Email:</strong> support@wanderlusttravels.com</li>
              <li><strong>Phone:</strong> +1 800 123 456</li>
              <li><strong>Address:</strong> 123 Travel Lane, City, Country</li>
            </ul>
          </div>
        </div>

        <hr className="my-4" />

        <div className="text-center">
          <p>&copy; {new Date().getFullYear()} Wanderlust Travels. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
