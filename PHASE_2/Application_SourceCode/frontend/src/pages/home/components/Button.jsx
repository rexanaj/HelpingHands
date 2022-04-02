import React from 'react';
import "./Button.css"

export const startButton = ({ children, onClick }) => {
    return (
        <button className="startButton" onClick={onClick}>
            {children} 
        </button>
    );
};