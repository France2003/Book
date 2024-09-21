import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2024 BookStore. All rights reserved.</p>
        <p>Liên hệ: contact@bookstore.com | Hotline: 123-456-789</p>
      </div>
    </footer>
  );
};

export default Footer;
