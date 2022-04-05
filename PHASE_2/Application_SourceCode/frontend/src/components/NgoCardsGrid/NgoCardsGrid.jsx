import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { Grid } from "@mui/material";
import FlipCard from "../FlipCard/FlipCard";
import "./NgoCardsGrid.css";

export default function NgoCardsGrid({ diseases, locations }) {
  const [ngos, setNgos] = useState([]);
  console.log(diseases);

  useEffect(() => {
    const fetchNgos = async () => {
      const res = await fetch(
        `http://localhost:5555/ngos?diseases=${diseases}`
      );
      const body = await res.json();

      setNgos(body);
    };

    fetchNgos();
  }, []);

  return (
    <Grid container spacing={4}>
      {ngos.map((ngo, index) => {
        return (
          <Grid key={index} item sm={12} md={6} lg={4}>
            <FlipCard cardDetails={ngo} />
          </Grid>
        );
      })}
    </Grid>
  );
}

NgoCardsGrid.propTypes = {
  diseases: PropTypes.string,
  locations: PropTypes.array,
};
