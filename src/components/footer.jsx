import React, { useState } from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import LocationPinIcon from '@mui/icons-material/LocationPin';
import MailIcon from '@mui/icons-material/Mail';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';

function Footer() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email submitted:", email);
    setEmail('');
  };

  return (
    <footer className="footer-container">
      <style>{`
        .footer-container {
          width: 100%;
          background-color: #003F7D;
          color: white;
          font-family: 'Poppins', sans-serif;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          padding: 30px 40px; /* smaller padding */
          box-sizing: border-box;
          gap: 25px;
        }

        .footer-content {
          flex: 1 1 280px;
          max-width: 380px;
        }

        .footer-content img {
          width: 100px;
          margin-bottom: 12px;
        }

        .info {
          font-size: 14px;
          line-height: 1.4;
          margin-bottom: 15px;
        }

        .newsletter-title {
          font-weight: 700;
          font-size: 20px;
          margin-bottom: 12px;
        }

        .email-form {
          max-width: 100%;
          height: 45px;
          display: flex;
          border-radius: 10px;
          overflow: hidden;
          border: 1px solid #ccc;
          box-shadow: inset 0 0 4px rgba(255, 255, 255, 0.2);
        }

        .email-field {
          flex: 1;
          height: 100%;
          padding: 0 12px;
          border: none;
          outline: none;
          font-size: 13px;
          background-color: transparent;
          color: white;
          border-radius: 10px 0 0 10px;
        }

        .email-field::placeholder {
          color: #ddd;
        }

        .subscribe-btn {
          width: 45px;
          height: 100%;
          border: none;
          border-radius: 0 10px 10px 0;
          background-color: #F98149;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .terms {
          margin-top: 15px;
          font-size: 11px;
          display: flex;
          gap: 20px;
        }

        .terms a {
          color: #bbb;
          text-decoration: none;
        }

        .quick-links {
          flex: 1 1 180px;
          max-width: 230px;
        }

        .quick-links h2 {
          font-size: 22px;
          margin-bottom: 15px;
        }

        .quick-links ul {
          list-style: none;
          padding: 0;
          margin: 0;
          font-size: 14px;
        }

        .quick-links ul li {
          margin-bottom: 8px;
        }

        .quick-links ul li a {
          color: #ddd;
          text-decoration: none;
        }

        .contact {
          flex: 1 1 230px;
          max-width: 280px;
        }

        .contact h2 {
          font-size: 22px;
          margin-bottom: 15px;
        }

        .contact ul {
          list-style: none;
          padding: 0;
          margin: 0;
          font-size: 14px;
          line-height: 1.3;
        }

        .contact ul li {
          margin-bottom: 10px;
          display: flex;
          align-items: flex-start;
          gap: 6px;
        }

        .contact ul li a {
          color: #ddd;
          text-decoration: none;
        }

        .MuiSvgIcon-root {
          margin-right: 4px;
          color: #F98149;
        }

        .social-icons {
          margin-top: 15px;
          display: flex;
          gap: 10px;
        }

        .social-icons a:hover {
          transform: scale(1.1);
          color: #F98149 !important;
        }

        @media (max-width: 900px) {
          .footer-container {
            flex-direction: column;
            padding: 25px 20px;
          }

          .footer-content, .quick-links, .contact {
            max-width: 100%;
            flex: 1 1 100%;
          }

          .email-form {
            width: 100%;
          }
        }
      `}</style>

      <div className="footer-content">
        <img src='src/assets/logo1.png' alt="Logo" />
        <p className="info">
          Let us build your career together. Be the first person to transform yourself<br />
          with our unique & world-class corporate level trainings.
        </p>

        <p className="newsletter-title">Subscribe to Our Newsletter</p>

        <form className="email-form" onSubmit={handleSubmit}>
          <input
            type="email"
            className='email-field'
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button className='subscribe-btn' type="submit">
            <KeyboardArrowRightIcon style={{ color: "white", width: "24px", height: "24px" }} />
          </button>
        </form>

        <div className='terms'>
          <a>Terms & Conditions</a>
          <a>Privacy Policy</a>
        </div>
      </div>

      <div className='quick-links'>
        <h2>Quick Links</h2>
        <ul>
          <li><a>Home</a></li>
          <li><a>Our Story</a></li>
          <li><a>Best Courses</a></li>
          <li><a>Your FAQ’s</a></li>
          <li><a>Cancellation & Refunds</a></li>
          <li><a>Contact US</a></li>
        </ul>
      </div>

      <div className='contact'>
        <h2>Contact us</h2>
        <ul>
          <li>
            <LocationPinIcon style={{ color: 'white' }} />
            Navakethan Complex,<br /> 6th Floor, 605, 606 A&P opp,<br />CLock Tower, SD Road, <br />Secunderabad, Telangana 500003
          </li>
          <li>
            <MailIcon style={{ color: 'white' }} />
            <a>info@ezyskills.in</a>
          </li>
          <li>
            <LocalPhoneIcon style={{ color: 'white' }} />
            <a>+91 8428448903<br /> +91 9475484959</a>
          </li>
        </ul>

        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FacebookIcon fontSize="medium" style={{ color: 'white' }} /></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><TwitterIcon fontSize="medium" style={{ color: 'white' }} /></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><InstagramIcon fontSize="medium" style={{ color: 'white' }} /></a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><LinkedInIcon fontSize="medium" style={{ color: 'white' }} /></a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><YouTubeIcon fontSize="medium" style={{ color: 'white' }} /></a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
