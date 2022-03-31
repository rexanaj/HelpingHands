import React, { useState, useEffect } from "react";


import NewsCard from "../../components/NewsCard"
import Grid from '@mui/material/Grid';

// This is an example of fetching from the api to get the sydnromes of a specific disease (in this case "Lassa Fever")
// BTW, don't put your code in the pages, create seperate components and import those
export default function ToHelpPage(props) {
    // const [ loading, setLoading ] = useState(false);
    const [ articles, setArticles ] = useState([]);
    const fetchArticles = async () => {
        const res = await fetch('http://localhost:5555/articles?limit=4');
        // setLoading(true);
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
        console.log(articles[index].headline)
        // const publication = articles[index].date_of_publication
        // const headline = articles[index]
        articles_holder.push(
            <Grid key={i} item xs={3}>
                {/* headline={articles[i].headline} mainText={articles[i].main_text} publication={publication} */}
                <NewsCard headline={articles[index].headline} mainText={articles[index].main_text} publication={articles[index].date_of_publication} url={articles[index].url} />
            </Grid>
        );
        i += 1;
    }
  return (
    <div>
        <Grid container spacing={4}>{articles_holder}</Grid>
    </div>
  );
}

