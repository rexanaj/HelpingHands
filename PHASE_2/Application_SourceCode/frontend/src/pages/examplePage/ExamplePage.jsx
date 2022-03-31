import React, { useState, useEffect } from "react";

import "./ExamplePage.css";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// This is an example of fetching from the api to get the sydnromes of a specific disease (in this case "Lassa Fever")
// BTW, don't put your code in the pages, create seperate components and import those
export default function ExamplePage(props) {
  const [syndromes, setSyndromes] = useState([]);
  const fetchSyndromes = async () => {
    // const res = await fetch("http://localhost:5555/diseases/Lassa Fever");
    // const body = await res.json();
    const mock = {syndromes: ["Hello", "1", "2"]}
    setSyndromes(mock.syndromes);
  };

  useEffect(() => {
    fetchSyndromes();
  }, [syndromes]);

  return (
    // <div>
    //   <div className="DiseaseSyndromes">
    //     {syndromes.map((value, index) => (
    //       <div key={index}>{value}</div>
    //     ))}
    //   </div>
    //   This is an example page. The passed in prop is: {props.word}
    // </div>
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="div">
          benevolent
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}

