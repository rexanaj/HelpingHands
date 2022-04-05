import React from "react";
import { Link } from 'react-router-dom';
import './header.css'

export const Header = () => {
    return (
        <header id="header-container">
            <Link to={"/"} id="header-link">
                <h1 id="header-text">HelpingHands</h1>
            </Link>
        </header>
    )
}