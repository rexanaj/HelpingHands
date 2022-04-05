import React from "react";
import { GiveHelpButton, GetHelpButton } from "../../components/frontPageButtons/FrontPageButton";
import "./homePage.css";


export default function HomePage () {
  return (
    <div className="home">
      <div className="home-content">
        <div className="home-content-half left">
          <GiveHelpButton />
          <h2 className="header-text">Give Help</h2>
        </div>
        <div className="home-content-half right">
          <GetHelpButton />
          <h2 className="header-text">Get Help</h2>
        </div>
      </div>
    </div>
  );
}
