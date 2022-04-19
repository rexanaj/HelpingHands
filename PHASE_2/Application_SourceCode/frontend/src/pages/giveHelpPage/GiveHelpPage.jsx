import React, { useState } from "react";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Spinner from "react-bootstrap/Spinner";
import Marquee from "react-fast-marquee";
import { ThemeProvider, createTheme } from '@mui/material/styles';


import "./GiveHelpPage.css";
import options from "../../components/Diseases";
import NewsCard from "../../components/NewsCard";
import NgoCardsGrid from "../../components/NgoCardsGrid/NgoCardsGrid.jsx";
<<<<<<< HEAD
import { Background } from "../../components/Background/Background";
=======
import { TwitterCarousel } from "../../components/twitterCarousel/TwitterCarousel";
import img1 from "../../assets/img/givehelp_img1.jpeg";
import img2 from "../../assets/img/givehelp_img2.jpg";
import img3 from "../../assets/img/givehelp_img3.jpeg";
import img4 from "../../assets/img/givehelp_img4.jpeg";
import img5 from "../../assets/img/givehelp_img5.jpeg";
import img6 from "../../assets/img/givehelp_img6.jpeg";
import img7 from "../../assets/img/givehelp_img7.jpeg";
import img8 from "../../assets/img/givehelp_img8.jpeg";
import img9 from "../../assets/img/givehelp_img9.jpeg";
import img10 from "../../assets/img/givehelp_img10.jpeg";
import img11 from "../../assets/img/givehelp_img11.jpeg";
>>>>>>> b69fcc193995043848d8f45df36bb140d1401163

// This is an example of fetching from the api to get the sydnromes of a specific disease (in this case "Lassa Fever")
// BTW, don't put your code in the pages, create seperate components and import those
export default function GiveHelpPage (props) {
  const [disease, setDisease] = useState("");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const submitDisease = () => {
    // if (ingredientName === '' || ingredientName === null) {
    //     alert("Please select a disease")
    //     return
    // }
    console.log("test");
    console.log(disease);
    fetchArticles();
  };

  const fetchArticles = async () => {
    let formatDisease = disease.replace(/ /g, "%20");
    const res = await fetch(
      `http://localhost:5555/articles?limit=4&keyterms=${formatDisease}`
    );
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

  const theme = createTheme({
    palette: {
      primary: {
        main: '#fff',
        dark: '#fff',
        light: '#fff',
        contrastText: '#fff',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            fontSize: '14px',
            fontFamily: '"graphik", Arial, Helvetica, sans-serif',
            textTransform: 'none',
            borderRadius: '4px',
            color: '#378e70',
            backgroundColor: '#e9f6f2',
            '&:hover': {
              backgroundColor: '#fff',
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            color: 'white',
            borderColor: 'white',
            '& label.Mui-focused': {
              color: 'white',
            },
            '& .MuiInput-underline:after': {
              borderBottomColor: 'white',
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'white',
              },
              '&:hover fieldset': {
                borderColor: 'white',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'white',
              },
            },
            "&.subvariant-hovered": {
              "& fieldset": {
                border: "none"
              },
              "& .MuiInputBase-input:hover + fieldset": {
                border: `2px solid blue`
              },
              "& .MuiInputBase-input:focus + fieldset": {
                border: `2px solid blue`
              }
            }
          }
        }
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            // this is styles for the new variants
            color: '#fff',
            "&.textfield-search": {
              "& fieldset": {
                color: 'white',
                borderColor: "white"
              },
            },
            "&.textfield-search:hover": {
              "& fieldset": {
                color: 'white',
                borderColor: "white"
              },
            },
          }
        }
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: '#fff',
            '&$focused': {
              color: '#fff'
            }
          }
        }
      },
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            color: '#fff',
          }
        }
      }
    },

  })

  return (
    <div id="givehelp-container">
<<<<<<< HEAD
      <Background />
      <h1 id="givehelp-title">Support those in need</h1>
      <div className="searchBar">
        <Autocomplete
          disablePortal
          id="search"
          value={disease}
          options={options}
          onChange={(event, value) => setDisease(value)}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Select a disease" />
          )}
        />
        <Button id="searchButton" variant="contained" onClick={submitDisease}>
          Give help
        </Button>
=======
      <div id="givehelp-title-container">
        <h1 id="givehelp-title">Support those in need</h1>
        <p className="givehelp-description">Our CharityAPI sources only the most relevant and up-to-date</p>
        <p className="givehelp-description">charities, so you can make the most informed decision on who to support. </p>
        <div id="marquee">
          <Marquee
            speed={10}
            gradientColor={[55, 142, 112]}
          >
            <img className="marquee-image" src={img1} alt="Poster wall" />
            <img className="marquee-image" src={img2} alt="Poster wall" />
            <img className="marquee-image" src={img3} alt="Poster wall" />
            <img className="marquee-image" src={img4} alt="Poster wall" />
            <img className="marquee-image" src={img5} alt="Poster wall" />
            <img className="marquee-image" src={img6} alt="Poster wall" />
            <img className="marquee-image" src={img7} alt="Poster wall" />
            <img className="marquee-image" src={img8} alt="Poster wall" />
            <img className="marquee-image" src={img9} alt="Poster wall" />
            <img className="marquee-image" src={img10} alt="Poster wall" />
            <img className="marquee-image" src={img11} alt="Poster wall" />
          </Marquee>
        </div>
        <div className="searchBar">
          <ThemeProvider theme={theme}>
            <Autocomplete
              disablePortal
              id="search"
              value={disease}
              options={options}
              onChange={(event, value) => setDisease(value)}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} className="textfield-search" color="primary" label="Select a disease" />
              )}
            />
            <Button className="givehelp-search-button" color="primary" onClick={submitDisease}>
              Give help
            </Button>
          </ThemeProvider>
        </div>
>>>>>>> b69fcc193995043848d8f45df36bb140d1401163
      </div>

      <div>
        {loading ? (
          <div>
            <div id="givehelp-who-container">
              <h1 className="givehelp-header">
                The most recent news from WHO
              </h1>
              <div className="givehelp-content">
                <Grid id="givehelp-who-articles" container spacing={3}>
                  {articles_holder}
                </Grid>
              </div>
            </div>

            <div id="givehelp-tweets-container">
              <h1 className="givehelp-header">
                See what people are saying on Twitter
              </h1>
              <div className="givehelp-content">
                <TwitterCarousel keyword={disease} />
              </div>
            </div>

            <div id="givehelp-charities-container">
              <h1 className="givehelp-header">
                Make a difference and donate today
              </h1>
              <div className="givehelp-content" id="givehelp-charities">
                <NgoCardsGrid diseases={disease} />
              </div>
            </div>
          </div>
        ) : (
          <Button className="spinner" color="primary" variant="success" disabled>
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
