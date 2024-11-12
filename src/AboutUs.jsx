import React from 'react';
import './AboutUs.css'; // Import the CSS file for styling

const AboutUs = () => {
  return (
    <div className="about-us-container">
        <h1 className="about-us-title">About Us</h1>
        <p className="about-us-paragraph">
        Welcome to our website! We are dedicated to providing the latest and most engaging news from around the world.
        Our mission is to inform, inspire, and connect people by delivering reliable and relevant information.
        </p>
    {/* Responsive, Centered Image */}
        <div className="image-container">
            <img
            src="/img/news/placholder.jpg" // Replace with your image path
            alt="About Us"
            className="about-us-image"
            />
        </div>
        <p className="about-us-paragraph">
        Our team of experienced journalists and content creators works tirelessly to ensure that every story we share
        is accurate and thought-provoking. We believe in the power of storytelling to bring communities together and
        make the world a better place.
        </p>
    </div>
  );
};

export default AboutUs;