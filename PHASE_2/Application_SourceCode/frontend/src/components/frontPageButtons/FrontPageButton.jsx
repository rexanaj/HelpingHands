import React from 'react';
import "./frontPageButton.css";
import GiveHelp from "../../assets/img/givehelp.jpg";
import GetHelp from "../../assets/img/gethelp.jpg";
import { Link } from 'react-router-dom';

export const GiveHelpButton = () => {
    return (
        <Link to={"/giveHelp"}>
            <button className="frontPageButton">
                <img className="frontPageButtonImage" src={GiveHelp} alt="Give help" />
            </button>
        </Link>
    );
};

export const GetHelpButton = () => {
    return (
        <Link to={"/getHelp"}>
            <button className="frontPageButton">
                <img className="frontPageButtonImage" src={GetHelp} alt="Get help" />
            </button>
        </Link>
    );
};
