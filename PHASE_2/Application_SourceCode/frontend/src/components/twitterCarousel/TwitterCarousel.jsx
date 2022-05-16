import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./TwitterCarousel.css";

import { TwitterTweetEmbed } from 'react-twitter-embed';

export function TwitterCarousel (props) {
    console.log(props.keyword);
    const [tweets, setTweets] = useState([]);
    const [pageIndex, setPageIndex] = useState(0);

    const updatePage = (increment) => {
        const newOffset = (((pageIndex + increment) % 3) + 3) % 3;
        document.getElementById("inner-slider").style.marginLeft = "-" + newOffset * 900 + "px";
        const dots = document.getElementsByClassName("dot");
        Array.from(dots).forEach(element => element.classList.remove("filled"));
        dots[newOffset].classList.add("filled");
        setPageIndex(newOffset);
    }

    useEffect(() => {
        fetch("https://seng3011-dwen.herokuapp.com/twitter/" + props.keyword)
            .then(res => res.json())
            .then((res) => {
                setTweets(res.data.slice(0, 9).map((res) =>
                    <div key={res.id} className="tweet-wrapper">
                        <TwitterTweetEmbed
                            options={{
                                cards: 'hidden',
                                conversation: 'none',
                                hideCard: true,
                                hideThread: true,
                            }}
                            id="tweet-card"
                            tweetId={res.id}
                        />
                    </div>
                ));
            });
    }, []);

    return (
        <div {...props} id='twitter-carousel'>
            <div className="row">
                <button onClick={() => updatePage(-1)}>&lt;</button>
                <div id='carousel-container'>
                    <div id='inner-slider'>
                        {tweets}
                    </div>
                </div>
                <button onClick={() => updatePage(1)}>&gt;</button>
            </div>
            <div className="row">
                <div className="dot filled"></div>
                <div className="dot"></div>
                <div className="dot"></div>
            </div>
        </div>
    )
}


TwitterCarousel.propTypes = {
    keyword: PropTypes.string,
};
