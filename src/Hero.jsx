import React from 'react';
// import { useState } from "react"

import SearchBar from './SearchBar';

const Hero = ({ onSearch }) => {
    return(
        <section className="hero" id="hero">

            <div className="hero-content">

                <h1 className="hero-text">A World
                <br />Within Reach</h1>
                <img src="img/manz.png" alt="Hero"  className="hero-image" />
                <div className="hero-placeholder"></div>
                
            </div>

            <SearchBar onSearch={onSearch} />

        </section>
    )
}

export default Hero;