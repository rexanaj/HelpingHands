import { React, useState, useEffect } from "react";

import Grid from "@mui/material/Grid";
import NewsCard from "../NewsCard";

function WhoPlaceholder () {
  // const [articles, setArticles] = useState([]);
  const [articlesHolder, setArticlesHolder] = useState(null);

  // // only call it once
  useEffect(async () => {
    const res = await fetch(
      `https://seng3011-dwen.herokuapp.com/articles?limit=4`
    );
    const articles = await res.json();
    const articles_holder = [];
    var i = 0;
    for (var index in articles) {
      let seconds = articles[index].date_of_publication._seconds;
      let pub_date = new Date(seconds * 1000);

      // format date
      let month = String(pub_date.getMonth() + 1);
      let day = String(pub_date.getDate());
      const year = String(pub_date.getFullYear());

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      let publication = `${day}/${month}/${year}`;
      // const headline = articles[index]
      let main_text = articles[index].main_text;
      main_text = main_text.slice(0, 300);
      main_text += " ...";
      articles_holder.push(
        <Grid key={i} item xs={3}>
          {/* headline={articles[i].headline} mainText={articles[i].main_text} publication={publication} */}
          <NewsCard
            className="article"
            headline={articles[index].headline}
            mainText={main_text}
            publication={publication}
            url={articles[index].url}
          />
        </Grid>
      );
      i += 1;
    }
    setArticlesHolder(articles_holder);

    return () => {
      setArticlesHolder(null);
    }
  }, []);

  return (
    <div className="givehelp-content">
      <Grid id="givehelp-who-articles" container spacing={3}>
        {articlesHolder}
      </Grid>
    </div>
  )
}

export default WhoPlaceholder;