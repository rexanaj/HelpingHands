import {React, useState, useEffect} from "react";

import Grid from "@mui/material/Grid";
import NewsCard from "./NewsCard";

function WhoCarousel() {
  const [articles, setArticles] = useState([]);
 

  const fetchArticles = async () => {
    const res = await fetch(
      `http://localhost:5555/articles?limit=4`
    );
    setArticles(await res.json());
  };

  // // only call it once
  useEffect(() => {
      fetchArticles();
  }, []);
  // console.log(articles)
  const articles_holder = [];
  var i = 0;
  for (var index in articles) {
    console.log(articles[index].headline);
    let seconds = articles[index].date_of_publication._seconds;
    let pub_date = new Date(seconds * 1000);

    // format date
    let month = String(pub_date.getMonth() + 1);
    let day = String(pub_date.getDate());
    const year = String(pub_date.getFullYear());

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    let publication = `${day}/${month}/${year}`;
    console.log(publication);
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
    return (
        <div className="givehelp-content">
              <Grid id="givehelp-who-articles" container spacing={3}>
                {articles_holder}
              </Grid>
        </div>
    )
}

export default WhoCarousel;
