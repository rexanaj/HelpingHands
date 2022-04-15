import React from "react";

import NgoCardFront from "../NgoCard/NgoCardFront.jsx";
import NgoCardBack from "../NgoCard/NgoCardBack.jsx";
import "./FlipCard.css";
import PropTypes from "prop-types";

export default function FlipCard({ cardDetails }) {
  return (
    <div className="flip-card-outer">
      <div className="flip-card-inner hover-trigger">
        <div className="card front">
          <div className="card-body d-flex justify-content-center align-items-center">
            {<NgoCardFront cardDetails={cardDetails} />}
          </div>
        </div>
        <div className="card back">
          <div className="card-body d-flex justify-content-center align-items-center">
            {<NgoCardBack cardDetails={cardDetails} />}
          </div>
        </div>
      </div>
    </div>
  );
}

FlipCard.propTypes = {
  cardDetails: PropTypes.object,
};
