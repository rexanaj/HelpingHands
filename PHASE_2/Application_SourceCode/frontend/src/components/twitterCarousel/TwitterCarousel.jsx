import { Carousel } from '3d-react-carousal';
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./TwitterCarousel.css";

export function TwitterCarousel(props) {
    const [images, setImages] = useState([]);
    const [tweets, setTweets] = useState([]);
    const [index, setIndex] = useState(0);

    const updateIndex = (index) => {
        setIndex(index);
    }

    useEffect(() => {
        fetch("http://localhost:5555/twitter/" + props.keyword)
            .then(res => res.json())
            .then((res) => {
                setImages(res.includes.media.map((res, index) => {
                    return <img key={index} src={res.url} alt={index} />
                }));
                setTweets(res.data.map((res) => res.text));
                setIndex(0);
            });
    }, []);

    return (
        <div id='twitter-carousel'>
            <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossOrigin="anonymous"></link>
            <div id='carousel-container'>
                <Carousel slides={images} arrows={true} onSlideChange={updateIndex} />
            </div>
            <p id='tweet-text'>{tweets[index]}</p>
        </div>
    )
}


TwitterCarousel.propTypes = {
    keyword: PropTypes.string,
};
