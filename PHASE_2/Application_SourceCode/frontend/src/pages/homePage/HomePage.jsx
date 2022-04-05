import React from "react";
import { GiveHelpButton, GetHelpButton } from "../../components/frontPageButtons/FrontPageButton";
import "./homePage.css";
import { Link } from 'react-router-dom'


export default function HomePage () {
  return (
    <div className="home">
      <div className="home-content">
        <div className="home-content-half left">
          <Link to={"/giveHelp"}>
            <GiveHelpButton />
          </Link>
          <h2 className="header-text">Give Help</h2>
        </div>
        <div className="home-content-half right">
          <Link to={"/getHelp"}>
            <GetHelpButton />
          </Link>
          <h2 className="header-text">Get Help</h2>
        </div>
      </div>
    </div>
  );
}
