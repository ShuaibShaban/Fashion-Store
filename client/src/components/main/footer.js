import React from "react";
import "./footer.css";
import { animateScroll } from "react-scroll";

const Footer = () => {
  return (
    <footer>
      <div class="footer-container">
        <div class="footer-column">
          <h3>About Us</h3>
          <p>
          Discover our story and mission. Learn about our values and commitment to providing quality products/services. Join us on our journey towards excellence.
          </p>
        </div>
        <div class="footer-column">
          <h3>Contact Us</h3>
          <ul>
            <li>
              <i class="fas fa-map-marker-alt"></i> 123 Main St, Nairobi, Kenya
            </li>
            <li>
              <i class="fas fa-phone-alt"></i> +254 123 456 789
            </li>
            <li>
              <i class="fas fa-envelope"></i> info@yourfashionwebsite.co.ke
            </li>
          </ul>
        </div>
        <div class="footer-column">
          <h3>Follow Us</h3>
          <ul class="social-links">
            <li>
              <a href="#">
                <i class="fab fa-facebook"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i class="fab fa-twitter"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i class="fab fa-instagram"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i class="fab fa-pinterest"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="bottom-bar">
        <p>&copy; 2023 Your Fashion Website. All rights reserved.</p>
        <button
          className="back-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Back to Top
        </button>
      </div>
    </footer>
  );
};

export default Footer;
