import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { Grid } from "@mui/material";
import FlipCard from "../FlipCard/FlipCard";
import "./NgoCardsGrid.css";

export default function NgoCardsGrid() {
  const [ngos, setNgos] = useState([]);
  const [searchParams] = useSearchParams();
  const diseases = searchParams.get("diseases");
  const locations = searchParams.get("locations");
  console.log(diseases);
  console.log(locations);

  useEffect(() => {
    const fetchNgos = async () => {
      const res = await fetch(
        `http://localhost:5555/ngos?diseases=${diseases}&locations=${locations}`
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
