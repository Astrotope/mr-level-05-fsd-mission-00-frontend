import {React, useState} from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
//import SearchIcon from './search.svg';
//import MovieCard from './MovieCard';
import Header from './Header';
import Hero from './Hero';
import Gallery from "./Gallery";
//import GalleryCard from "./GalleryCard";
import Footer from "./Footer";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";

//const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=a7d1fcab';

// const movie1 = {
//     "Title": "Spiderman",
//     "Year": "1990",
//     "imdbID": "tt0100669",
//     "Type": "movie",
//     "Poster": "N/A"
// }

const App = () => {

    //const [movies, setMovies] = useState([]);
    //const [searchTerm, setSearchTerm] = useState('');

    // State to store the search query
    const [searchQuery, setSearchQuery] = useState('');

    // Update the search query state
    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    // const search = async (title) => {
    //     const response = await fetch(`${API_URL}&s=${title}`);
    //     const data = await response.json();
    //     setMovies(data.Search);
    // }

    // useEffect(() => {
    //     search('Spiderman');
    // }, []);

    return (
        <Router>
        <body>
        <div className="app">
            <Header />
            <main className="main" id="main">
            <Hero onSearch={handleSearch} />
            <Routes>
                <Route path="/" element={<Gallery searchQuery={searchQuery} />} /> {/* Home route */}
                <Route path="/about" element={<AboutUs />} /> {/* About Us route */}
                <Route path="/contact" element={<ContactUs />} /> {/* Contact Us route */}
            </Routes>
            </main>
            <Footer />
        </div>
        </body>
        </Router>
    );
}

export default App;