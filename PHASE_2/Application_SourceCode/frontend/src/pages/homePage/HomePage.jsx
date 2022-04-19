import React from "react";
import { GiveHelpButton, GetHelpButton } from "../../components/frontPageButtons/FrontPageButton";
import "./homePage.css";
import { Link } from 'react-router-dom'


export default function HomePage () {
  return (
    <div className="home-wrapper">
      <div className="home">
        <div className="left home-content-half">
          <div className="logo"></div>
          <div className="home-title">
            Find a place to help others or seek to help yourself
          </div>
          <div className="home-text">
            We help you to discover at-risk communities and a platform to share your voice
          </div>
          <div className="home-subtext">
            Explore what we offer now
          </div>
          <div className="home-buttons">
            <Link to={"/giveHelp"}>
                <GiveHelpButton />
            </Link>
            <Link to={"/giveHelp"}>
              <GetHelpButton />
            </Link>
          </div>
        </div>
        <div className="right home-content-half">
          <div className="home-header">
            <div className="home-link">
              About us
            </div>
            <div className="home-link">
              Contact us
            </div>
          </div>
          <div className="home-photo"></div>
        </div>
      </div>
      <div className="footer">
        <div className="stats">
          670,000
          <div className="stats-inner">affected by communicable diseases in 2016</div>
        </div>
        <div className="stats">
          Billions
          <div className="stats-inner">at risk of contracting a life-threatening endemic disease</div>
        </div>
        <div className="stats">
          7,500
          <div className="stats-inner">children die from diseases easily treated with proper care</div>
        </div>
      </div>
    </div>
    
  );
}
