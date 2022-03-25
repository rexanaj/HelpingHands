import React, { useState, useEffect } from "react";

import "./ExamplePage.css";
import PropTypes from "prop-types";

// This is an example of fetching from the api to get the sydnromes of a specific disease (in this case "Lassa Fever")
// BTW, don't put your code in the pages, create seperate components and import those
export default function ExamplePage(props) {
  const [syndromes, setSyndromes] = useState([]);
  const fetchSyndromes = async () => {
    const res = await fetch("http://localhost:5555/diseases/Lassa Fever");
    const body = await res.json();

    setSyndromes(body.syndromes);
  };

  useEffect(() => {
    fetchSyndromes();
  }, [syndromes]);

  return (
    <div>
      <div className="DiseaseSyndromes">
        {syndromes.map((value, index) => (
          <div key={index}>{value}</div>
        ))}
      </div>
      This is an example page. The passed in prop is: {props.word}
    </div>
  );
}

ExamplePage.propTypes = {
  word: PropTypes.string,
};
