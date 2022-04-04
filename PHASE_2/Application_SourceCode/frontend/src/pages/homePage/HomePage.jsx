import React from "react";
import { GiveHelpButton, GetHelpButton } from "../../components/frontPageButtons/FrontPageButton";
import "./homePage.css";
import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div className="HomePage">
      <div className="left">
          <div className="centered">
            <Link to={"/giveHelp"}>
              <GiveHelpButton buttonOnClick={() => { console.log("Give help") }} />
            </Link>
              <h2>Give Help</h2>
          </div>
      </div>

      <div className="right">
          <div className="centered">
              <GetHelpButton buttonOnClick={() => { console.log("Get help") }} />
              <h2>Get Help</h2>
          </div>
      </div>
    </div>
  );
}
