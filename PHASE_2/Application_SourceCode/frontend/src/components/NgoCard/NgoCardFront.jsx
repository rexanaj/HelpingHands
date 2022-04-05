import React from "react";

import "./NgoCardFront.css";
import PropTypes from "prop-types";

export default function NgoCardFront(props) {
  const cardDetails = props.cardDetails;

  return (
    <div id="cardContainer">
      <div id="ngoImage">
        <img
          src={cardDetails.image}
          alt="NGO"
          onError={(event) => {
            event.target.src =
              "https://i0.wp.com/www.giveindia.org/blog/wp-content/uploads/2021/02/banner-1.jpg?fit=1200%2C675&ssl=1";
            event.onerror = null;
          }}
        />
      </div>
      <div id="ngoLogo">
        <a href={cardDetails.url}>
          <img
            src={cardDetails.logo}
            alt="NGO logo"
            onError={(event) => {
              event.target.src =
                "https://upload.wikimedia.org/wikipedia/commons/7/71/Earth_icon_2.png";
              event.onerror = null;
            }}
          />
        </a>
      </div>
      <div id="cardBody">
        <div id="ngoTitle">{cardDetails.name}</div>
        <div id="ngoType">{cardDetails.type}</div>
        <div id="ngoMission">{cardDetails.mission}</div>
        <div id="cardBottom">
          <hr id="hDivider" />
          <div id="cardTable">
            <div className="tableItem">
              <div>{cardDetails.rating}/5</div>
              <span>Rating</span>
            </div>
            <span id="vDivider" />
            {cardDetails.num_active_locations !== 0 && (
              <>
                <div className="tableItem">
                  <div>{cardDetails.num_active_locations}</div>
                  <span>Active Locations</span>
                </div>
                <span id="vDivider" />
              </>
            )}
            <div className="tableItem">
              <div>{cardDetails.launch_year}</div>
              <span>Launch Year</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

NgoCardFront.propTypes = {
  cardDetails: PropTypes.object,
};
