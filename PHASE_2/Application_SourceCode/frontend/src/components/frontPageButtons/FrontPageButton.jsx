import React from 'react';
import "./frontPageButton.css";
import GiveHelp from "../../assets/images/giveHelpNew.svg";
import GetHelp from "../../assets/images/getHelpNew.svg";
import { Link } from 'react-router-dom';

export const GiveHelpButton = () => {
    return (
        <Link to={"/giveHelp"}>
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
        <Link to={"/getHelp"}>
            <button className="frontPageButton getHelpButton">
                <img className="frontPageButtonImage" src={GetHelp} alt="Get help" />
                <div className="button-text">
                    Get Help 
                </div>
            </button>
        </Link>
    );
};
