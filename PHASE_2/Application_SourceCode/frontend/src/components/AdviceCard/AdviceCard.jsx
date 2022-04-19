import React, { useState } from "react";
import PropTypes from "prop-types";

import Grid from "@mui/material/Grid";

export default function AdviceCard({ card }) {
  const initialVoteTotal = 0;
  const [upvote, setUpvote] = useState(card.upvotes.includes(card.id));
  const [downvote, setDownvote] = useState(card.downvotes.includes(card.id));
  const [voteTotal, setVoteTotal] = useState(
    card.upvotes.length - card.downvotes.length
  );

  const onUpvote = async () => {
    if (!upvote) {
      setUpvote(true);
      setDownvote(false);
      setVoteTotal(initialVoteTotal + 1);

      await fetch(`http://localhost:5555/posts/upvotePost`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          id: card.id,
          uid: card.id,
        }),
      });
    }
  };

  const onDownvote = async () => {
    if (!downvote) {
      setDownvote(true);
      setUpvote(false);
      setVoteTotal(initialVoteTotal - 1);

      await fetch(`http://localhost:5555/posts/downvotePost`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          id: card.id,
          uid: card.id,
        }),
      });
    }
  };

  return (
    <Grid item xs={12} sm={6} md={4} className="card-list">
      <div className="card">
        <div className="header">
          <h2>{card.name}</h2>
        </div>
        <div className="content">
          <p className="quotation-mark">&ldquo;</p>
          <div className="quote">
            <p>{card.content}</p>
          </div>
          <p className="quotation-mark end">&rdquo;</p>
          <div className="advice-card-footer">
            <button>Contact</button>
            <div className="advice-votes">
              <div className="voting-options">
                <span
                  onClick={onUpvote}
                  className={upvote ? "vote-selected" : null}
                >
                  ʌ
                </span>
                <span
                  onClick={onDownvote}
                  className={downvote ? "vote-selected" : null}
                >
                  v
                </span>
              </div>
              <span id="vote-total">{voteTotal}</span>
            </div>
            <span className="advice-card-date">{card.date}</span>
          </div>
        </div>
      </div>
    </Grid>
  );
}

AdviceCard.propTypes = {
  card: PropTypes.object,
  index: PropTypes.number,
};
