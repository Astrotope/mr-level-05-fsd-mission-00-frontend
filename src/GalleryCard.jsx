import React, { useEffect, useState } from 'react';

const GalleryCard = ({ title, year, type, poster }) => {
  const [imageSrc, setImageSrc] = useState(poster);
  const unsplashAccessKey = 't8b6BhgZnYzgvyRsxIR1C4_5vebmSpKmk14Bw7YsLCo'; // Replace with your Unsplash access key

  // Function to fetch a random marketing image from Unsplash
  const fetchUnsplashImage = async () => {
    try {
      const response = await fetch(`https://api.unsplash.com/photos/random?query=marketing&client_id=${unsplashAccessKey}`);
      const data = await response.json();
      if (data && data.urls && data.urls.regular) {
        setImageSrc(data.urls.regular);
      }
    } catch (error) {
      console.error('Error fetching image from Unsplash:', error);
    }
  };

  // Use an effect to check if the poster image loads
  useEffect(() => {
    const img = new Image();
    img.src = poster;

    img.onload = () => {
      setImageSrc(poster); // Use the original poster if it loads successfully
    };

    img.onerror = () => {
      fetchUnsplashImage(); // Use Unsplash image if the poster fails to load
    };
  }, [poster]);

  return (
    <div className="gallery-card">
      <div><p>{year}</p></div>
      <div>
        <img
          src={imageSrc}
          alt={title}
          onError={(e) => {
            e.target.onerror = null; // Prevent infinite loop
            fetchUnsplashImage(); // Fetch a new Unsplash image if the image fails again
          }}
        />
      </div>
      <div><span>{type}</span><h3>{title}</h3></div>
    </div>
  );
};

export default GalleryCard;
