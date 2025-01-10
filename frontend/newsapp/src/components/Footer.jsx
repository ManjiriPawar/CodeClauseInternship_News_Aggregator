const Footer = () => {
  return (
    <footer>
      <p>
        Contact us: <a href="mailto:info@newsapp.com">info@TrendTales.com</a>
      </p>
      <div className="footer-links">
        <a href="/privacy-policy">Privacy Policy</a> |
        <a href="/terms-of-service">Terms of Service</a> |
        <a href="/contact">Contact</a>
      </div>
      <div className="social-media">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
        >
          <i className="fab fa-facebook-f"></i>
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter"
        >
          <i className="fab fa-twitter"></i>
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <i className="fab fa-instagram"></i>
        </a>
      </div>
      <p>&copy; {new Date().getFullYear()} TrendTales. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
