import React, { useState, useEffect } from "react";

import "./ExamplePage.css";
import PropTypes from "prop-types";

export default function ExamplePage(props) {
  const [reports, setReports] = useState([]);
  const fetchReports = async () => {
    const res = await fetch("http://localhost:5555/diseases/reports");
    setReports(await res.json());
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div>
      <div className="ReportsList">{reports}</div>
      This is an example page. The passed in prop is: {props.word}
    </div>
  );
}

ExamplePage.propTypes = {
  word: PropTypes.string,
};
