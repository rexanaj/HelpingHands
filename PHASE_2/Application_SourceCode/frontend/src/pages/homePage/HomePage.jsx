import React from "react";
import { GiveHelpButton, GetHelpButton } from "../../components/frontPageButtons/FrontPageButton";
import "./homePage.css";

export default function HomePage() {
  return (
    <div className="HomePage">
      <div className="left">
          <div className="centered">
              <GiveHelpButton buttonOnClick={() => { console.log("Give help") }} />
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
