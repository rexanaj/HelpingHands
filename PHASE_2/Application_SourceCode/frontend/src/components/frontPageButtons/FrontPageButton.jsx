import React from 'react';
import "./frontPageButton.css";
import GiveHelp from "../../assets/images/giveHelpNew.svg";
import GetHelp from "../../assets/images/getHelpNew.svg";
import { Link } from 'react-router-dom';

export const GiveHelpButton = () => {
    return (
        <Link className="frontPageButtonLink" to={"/giveHelp"} style={{ textDecoration: 'none' }}>
            <button className="frontPageButton giveHelpButton">
                <img className="frontPageButtonImage" src={GiveHelp} alt="Give help" />
                <div className="button-text">
                    Give Help
                </div>
            </button>
        </Link>
    );
};

export const GetHelpButton = () => {
    return (
        <Link to={"/getHelp"} style={{ textDecoration: 'none' }}>
            <button className="frontPageButton getHelpButton">
                <img className="frontPageButtonImage" src={GetHelp} alt="Get help" />
                <div className="button-text">
                    Get Help
                </div>
            </button>
        </Link>
    );
};
