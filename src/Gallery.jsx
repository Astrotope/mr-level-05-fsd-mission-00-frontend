import React, { useState, useEffect } from 'react';
import GalleryCard from './GalleryCard';
import { useConfig } from './ConfigContext'; // Import the named export

const Gallery = ({ searchQuery }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const { apiUrl } = useConfig(); // Destructure apiUrl from the context

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true); // Reset loading state when the query changes
      const url = searchQuery
        ? `${apiUrl}/search?q=${searchQuery}` // For search query
        : `${apiUrl}/search`; // For all articles

      try {
        const response = await fetch(url);
        const result = await response.json();
        
        // Limit the number of articles to 12 on first load or when the query changes       
        const limitedData = result.Search ? result.Search.slice(0, 12) : [];

        setData(limitedData);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [apiUrl, searchQuery]); // Refetch when the search query changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data || data.length === 0) {
    return (
        <div className="gallery" id="gallery">
            <GalleryCard
              key='blank-key'
              title='No Result Found'
              year='0000'
              type='NONE'
              poster='/img/news/placholder.jpg'
            />
        </div>
      );
  }

  return (
    <div className="gallery" id="gallery">
      {data.map((item) => (
        <GalleryCard
          key={item.imdbID}
          title={item.Title}
          year={item.Year}
          type={item.Type}
          poster={item.Poster}
        />
      ))}
    </div>
  );
};

export default Gallery;

