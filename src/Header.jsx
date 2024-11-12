import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import './Header.css';
import { useConfig } from './ConfigContext'; // Import the named export


// Make sure to bind the modal to your app element for accessibility
Modal.setAppElement('#root');

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { apiUrl } = useConfig(); // Destructure apiUrl from the context

  // const navigate = useNavigate();

  // Function to handle menu toggle
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to check if the screen size is narrow
  const updateViewMode = () => {
    setIsMobileView(window.innerWidth < 768); // Example breakpoint at 768px
  };

  // Set up an event listener for window resizing
  useEffect(() => {
    updateViewMode();
    window.addEventListener('resize', updateViewMode);
    return () => window.removeEventListener('resize', updateViewMode);
  }, []);

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
  
    const formData = new FormData(event.target);
    const username = formData.get('username');
    const password = formData.get('password');
  
    if (!username || !password) {
      alert('Please fill in both username and password.');
      return;
    }
  
    try {
      // Make the API call to your backend (replace URL with your actual endpoint)
      const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert('Login successful!');
        closeModal(); // Close the modal on success
      } else {
        alert(`Login failed: ${data.message || 'Invalid credentials'}`);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred. Please try again later.');
    }
  };

    // Function to open modal
    const openModal = () => {
        setIsModalOpen(true);
        };

    // Function to close modal and navigate to /sign-in
    const closeModal = () => {
    setIsModalOpen(false);
    //navigate('/sign-in');  // Navigate to the Sign In page after closing the modal
    };

  return (
    <header className="header">
      <div className="logo-container">
        <img className="logo-image" src="./img/logo.jpg" alt="Logo" />
        <h1 className="logo-text">M.A.N.Z. - News</h1>
      </div>
      <div className="menu-button" onClick={handleMenuToggle}>
        ☰
      </div>
      <nav className={`nav-menu ${isMenuOpen ? 'menu-active' : ''}`}>
        <ul>
          <li className="nav-item">
            <Link to="/" onClick={isMobileView ? handleMenuToggle : null}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" onClick={isMobileView ? handleMenuToggle : null}>
              About Us
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" onClick={isMobileView ? handleMenuToggle : null}>
              Contact Us
            </Link>
          </li>
          <li className="nav-item">
            <Link
                to="/sign-in"
                onClick={(e) => {
                    e.preventDefault();  // Prevent navigation to /sign-in
                    openModal();          // Open the modal
                    if (isMobileView) {
                    handleMenuToggle();  // Close the menu in mobile view
                    }
                }}
                >
                Sign In
            </Link>
          </li>
        </ul>
      </nav>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Login Modal"
        ariaHideApp={false} // Prevent app from hiding when modal is open
        style={{
            content: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            maxWidth: '500px',
            padding: '20px',
            backgroundColor: 'white',
            borderRadius: '10px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
            zIndex: 1000, // Ensure it's on top of other elements
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start', // Make sure content doesn't stretch
            alignItems: 'stretch', // Align the content
            minHeight: '200px', // Ensure it's not too small
            },
            overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999, // Overlay should be behind modal
            },
        }}
        >
        <h2>Login</h2>
        <form onSubmit={handleLoginSubmit}>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" required />
            
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
            
            <button className="styled-submit-button" type="submit">Submit</button>
        </form>
        <button className="styled-close-button" onClick={closeModal}>Close</button>
        </Modal>
    </header>
  );
};

export default Header;
