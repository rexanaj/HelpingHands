import React from "react";
import { Link } from 'react-router-dom';
import './header.css'
import logo from '../../assets/img/logo.svg';

export const Header = () => {
    return (
        <header id="header-container">
            <div id="header-link">
                <Link to={"/"}>
                    <img id="header-image" src={logo} alt="logo" />
                </Link>
            </div>
        </header>
    )
}
