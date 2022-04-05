import React, { useState } from "react";


import NewsCard from "../../components/NewsCard"
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import options from "../../components/Diseases"
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Spinner from 'react-bootstrap/Spinner';
import "./GiveHelpPage.css"
import { TwitterCarousel } from "../../components/twitterCarousel/TwitterCarousel";

// This is an example of fetching from the api to get the sydnromes of a specific disease (in this case "Lassa Fever")
// BTW, don't put your code in the pages, create seperate components and import those
export default function GiveHelpPage (props) {
    const [disease, setDisease] = useState('');
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const submitDisease = () => {
        // if (ingredientName === '' || ingredientName === null) {
        //     alert("Please select a disease")
        //     return
        // }
        console.log("test")
        console.log(disease)
        fetchArticles();

    };


    const fetchArticles = async () => {
        let formatDisease = disease.replace(/ /g, "%20")
        const res = await fetch(`http://localhost:5555/articles?limit=4&keyterms=${formatDisease}`);
        setLoading(true);
        setArticles(await res.json());
    };

    // // only call it once
    // useEffect(() => {
    //     fetchArticles();
    // }, []);
    // console.log(articles)
    const articles_holder = [];
    var i = 0;
    for (var index in articles) {
        console.log(articles[index].headline)
        let seconds = articles[index].date_of_publication._seconds
        let pub_date = new Date(seconds * 1000)

        // format date
        let month = String(pub_date.getMonth() + 1);
        let day = String(pub_date.getDate());
        const year = String(pub_date.getFullYear());

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        let publication = `${day}/${month}/${year}`;
        console.log(publication)
        // const headline = articles[index]
        let main_text = articles[index].main_text
        main_text = main_text.slice(0, 300);
        main_text += " ..."
        articles_holder.push(
            <Grid key={i} item xs={3}>
                {/* headline={articles[i].headline} mainText={articles[i].main_text} publication={publication} */}
                <NewsCard className="article" headline={articles[index].headline} mainText={main_text} publication={publication} url={articles[index].url} />
            </Grid>
        );
        i += 1;
    }
    return (
        <div id="givehelp-container">
            <h1 id="givehelp-title">Support those in need</h1>
            <div className="searchBar">
                <Autocomplete
                    disablePortal
                    id="search"
                    value={disease}
                    options={options}
                    onChange={(event, value) => setDisease(value)}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Select a disease" />}
                />
                <Button id="searchButton" variant="contained" onClick={submitDisease}>Give help</Button>
            </div>

            <div>
                {loading ?
                    <div>
                        <h1 className="givehelp-header">Find the most recent news from WHO</h1>
                        <div className="givehelp-content">
                            <Grid id="givehelp-who-articles" container spacing={3}>{articles_holder}</Grid>
                        </div>
                        <h1 className="givehelp-header">See what people are saying on Twitter</h1>
                        <div className="givehelp-content">
                            <TwitterCarousel keyword={disease} />
                        </div>
                        <h1 className="givehelp-header">Make a difference and donate today</h1>
                        <div className="givehelp-content" id="givehelp-charities">

                        </div>
                    </div>

                    : (
                        <Button className="spinner" variant="success" disabled>
                            <Spinner
                                as="span"
                                animation="grow"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                        </Button>
                    )}
            </div>

        </div>
    );
}

