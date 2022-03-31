import React from "react";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { CardMedia } from "@mui/material";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

export default function NewsCard(props) {
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
          <CardMedia
            component="img"
            sx={{ width: 151 }}
            image=""
            alt="Live from space album cover"
        />
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {props.publication}
          </Typography>
          <Typography variant="h5" component="div">
            {props.headline}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            WHO
          </Typography>
          <Typography variant="body2">
            {props.mainText}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" href={props.url}>Learn More</Button>
        </CardActions>
      </Card>
    );
}

NewsCard.propTypes = {
    publication: PropTypes.string,
    headline: PropTypes.string,
    mainText: PropTypes.string,
    url: PropTypes.string,
};