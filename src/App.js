import {React, useState, useEffect} from "react";

import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';
import Header from './Header';
import Hero from './Hero';
import SearchBar from './SearchBar';
import Gallery from "./Gallery";
import GalleryCard from "./GalleryCard";
import Footer from "./Footer";


const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=a7d1fcab';

const movie1 = {
    "Title": "Spiderman",
    "Year": "1990",
    "imdbID": "tt0100669",
    "Type": "movie",
    "Poster": "N/A"
}

const App = () => {

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const search = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        setMovies(data.Search);
    }

    useEffect(() => {
        search('Spiderman');
    }, []);

    return (
        <div className="app">
            <h1>MovieLand</h1>
            <Header />
            <main>
            <Hero />
            <SearchBar />
            <div className="search">
                <input
                    placeholder="Search for movies"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                    src={SearchIcon}
                    alt="search"
                    onClick={() => search(searchTerm)}
                />
            </div>
            <div className="search">
              <button 
                      className="search-button"
                      placeholder="Search for movies"
                      type="submit"
                      onClick={() => search(searchTerm)}>Search</button>              
            </div>
            <div>
              
            </div>

            <Gallery />
            <GalleryCard />

            {movies?.length > 0
                ? (
                    <div className="container">
                    {movies.map((movie) => (
                        <MovieCard movie={movie} />
                    ))}
                    </div>
                ) : (
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}

export default App;