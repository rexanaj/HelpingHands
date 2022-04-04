import React from 'react';
import PropTypes from 'prop-types';
import "./frontPageButton.css";
import GiveHelp from "../../assets/givehelp.jpg";
import GetHelp from "../../assets/gethelp.jpg";

export const GiveHelpButton = ({ buttonOnClick }) => {
    return (
        <button className="startButton">
            <img src={ GiveHelp } alt="Give Help" onClick={buttonOnClick}/>
        </button>
    );
};

export const GetHelpButton = ({ buttonOnClick }) => {
    return (
        <button className="startButton">
            <img src={ GetHelp } alt="Give Help" onClick={buttonOnClick}/>
        </button>
    );
};

GiveHelpButton.propTypes = {
    buttonText: PropTypes.string.isRequired,
    buttonOnClick: PropTypes.func.isRequired
};

GetHelpButton.propTypes = {
    buttonText: PropTypes.string.isRequired,
    buttonOnClick: PropTypes.func.isRequired
};
