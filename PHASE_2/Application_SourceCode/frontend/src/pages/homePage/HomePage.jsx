import React from "react";
import { GiveHelpButton, GetHelpButton } from "../../components/frontPageButtons/FrontPageButton";
import BgGiveHelp from "../../assets/bggivehelp.jpg";
import BgGetHelp from "../../assets/bggethelp.jpg";
import "./homePage.css";

export default function HomePage() {
  return (
    <div className="HomePage">
      <div className="left" style={{ backgroundImage: `url(${BgGiveHelp})` }}>
          <div className="centered">
              <GiveHelpButton buttonOnClick={() => { console.log("Give help") }} />
              <h2>Give Help</h2>
          </div>
      </div>

      <div className="right" style={{ backgroundImage: `url(${BgGetHelp})` }}>
          <div className="centered">
              <GetHelpButton buttonOnClick={() => { console.log("Get help") }} />
              <h2>Get Help</h2>
          </div>
      </div>
    </div>
  );
}
