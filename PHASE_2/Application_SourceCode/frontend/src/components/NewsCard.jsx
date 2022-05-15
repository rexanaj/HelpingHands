import React from "react";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

export default function NewsCard (props) {
  return (
    <Card className={props.className} sx={{ minWidth: 275, maxWidth: 380 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {props.publication}
        </Typography>
        <Typography variant="h5" component="div">
          {props.headline}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          WHO Report
        </Typography>
        <hr />
        <Typography className="who-main-text" variant="body2">
          {props.mainText}
        </Typography>
      </CardContent>
      <CardActions>
        <Button className="card-button" size="small" href={props.url} target="_blank" rel="noopener noreferrer">Read More</Button>
      </CardActions>
    </Card>
  );
}

NewsCard.propTypes = {
  publication: PropTypes.string,
  headline: PropTypes.string,
  mainText: PropTypes.string,
  url: PropTypes.string,
  className: PropTypes.string,
};