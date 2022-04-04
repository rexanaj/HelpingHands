import React from "react";

import "./NgoCardBack.css";
import PropTypes from "prop-types";

export default function NgoCardBack(props) {
  const cardDetails = props.cardDetails;

  return (
    <div id="cardContainer">
      <div id="ngoImage">
        <img src={cardDetails.image} id="ngoBackImage" alt="NGO" />
        <div id="ngoQuote">&quot;{cardDetails.quote}&quot;</div>
      </div>
      <div id="ngoLogo">
        <a href={cardDetails.url}>
          <img src={cardDetails.logo} alt="NGO logo" />
        </a>
      </div>
      <div id="cardBody">
        <div id="cardLists">
          <div id="keywordsList">
            <span className="cardListsTitle">Keywords</span>
            <ul id="ngoKeywords">
              {cardDetails.keywords.slice(0, 5).map((keyword, index) => {
                return (
                  <li className="keywordItem" key={index}>
                    {keyword}
                  </li>
                );
              })}
            </ul>
          </div>
          <div id="locationsList">
            <span className="cardListsTitle">Locations</span>
            <ul id="ngoLocations">
              {cardDetails.locations.slice(0, 5).map((location, index) => {
                return (
                  <li className="locationItem" key={index}>
                    {location}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

NgoCardBack.propTypes = {
  cardDetails: PropTypes.object,
};
