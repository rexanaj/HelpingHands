import React from 'react';
import PropTypes from 'prop-types';
import "./frontPageButton.css"

export const FrontPageButton = ({ buttonText, buttonOnClick }) => {
    return (
        <button className="startButton" onClick={buttonOnClick}>
            {buttonText}
        </button>
    );
};

FrontPageButton.propTypes = {
    buttonText: PropTypes.string.isRequired,
    buttonOnClick: PropTypes.func.isRequired
};
