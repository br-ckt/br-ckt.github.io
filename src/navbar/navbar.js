import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = ({ isDarkBackground }) => {
    const [hovered, setHovered] = useState(false);

    return (
        <nav className={`navbar ${isDarkBackground ? 'dark-background' : 'light-background'}`}>
            <h1
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <span className="first-name">br-ckt</span>
                <span className="middle-name">
                    {hovered ? " {" : ""}
                </span>
                <span className="last-name"></span>
            </h1>
            <ul>
                <li><Link to="">generate</Link></li>
                <li><Link to="/info">how it works</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
