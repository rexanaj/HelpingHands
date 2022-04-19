import React, { useState } from "react";
import Button from "@mui/material/Button";
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import options from "../../components/Diseases";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import "./GetHelpPage.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Checkbox, FormControlLabel } from "@mui/material";
import { Bubbles } from "../../components/Bubbles/Bubbles";
import AdviceCard from "../../components/AdviceCard/AdviceCard";

export default function GetHelpPage() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [advice, setAdvice] = useState("");
  const [disease, setDisease] = useState("");

  // advice cards
  const [responses, setResponses] = useState([]);

  // checkboxes
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);

  const getAdvice = async () => {
    const res = await fetch(`http://localhost:5555/posts/${disease}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });

    const responses = await res.json();
    console.log(responses);
    setResponses(responses);
    setLoading(true);
  };

  // job board is updated here
  const submitDisease = () => {
    setLoading(false);

    // update the advice section
    getAdvice();
  };

  const addAdvice = async () => {
    // validate form
    switch (true) {
      case name === "":
        alert("Please fill out your name");
        return;
      case advice === "":
        alert("Please fill out your advice");
        return;
      case check1 === false || check2 === false:
        alert("Please check both checkboxes");
        return;
      default:
        break;
    }

    const current = new Date();
    const date = `${current.getDate()}/${
      current.getMonth() + 1
    }/${current.getFullYear()}`;

    const res = await fetch(`http://localhost:5555/posts/makePost`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        content: advice,
        disease: disease,
        date: date,
      }),
    });

    const body = await res.json();
    if (body.error) {
      alert(body.error);
    } else {
      toast(`Advice from ${name} added successfully!`);
      setAdvice("");
      setName("");
      setCheck1(false);
      setCheck2(false);
    }
  };

  return (
    <div>
      <Bubbles />

      {/* Hero unit */}
      <Box
        sx={{
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
            id="gethelp-title"
          >
            Find Help Here
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            See what others in your situation are saying.
          </Typography>
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <Autocomplete
              disablePortal
              id="search"
              value={disease}
              options={options}
              onChange={(event, value) => {
                setDisease(value);
              }}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Select a disease" />
              )}
            />
            <Button
              id="searchButton"
              variant="contained"
              onClick={submitDisease}
            >
              Get help
            </Button>
          </Stack>
        </Container>
      </Box>

      <ToastContainer />

      {loading ? (
        <Container sx={{ py: 8 }} maxWidth="md" id="gethelp-card-container">
          {/* End hero unit */}
          <h1 className="gethelp-header">Advice from our users</h1>
          {responses.length > 0 ? (
            <Grid id="card-list" container spacing={4}>
              {responses.map((card, index) => (
                <AdviceCard key={index} card={card} />
              ))}
            </Grid>
          ) : (
            <h1>No posts yet</h1>
          )}
          <h1 className="gethelp-header">
            Add some advice for anybody affected
          </h1>
          <div id="enterForm">
            <h2 className="subtitle">Enter your name</h2>
            <TextField
              className="textField"
              value={name}
              id="outlined-textarea"
              label="Username"
              placeholder="Enter your name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <h2 className="subtitle">Enter some advice</h2>
            <TextField
              className="textField"
              value={advice}
              fullWidth
              id="outlined-multiline-static"
              rows={4}
              label="add some advice"
              onChange={(e) => {
                setAdvice(e.target.value);
              }}
            />
            <div id="checkbox-area">
              <FormControlLabel
                className="checkbox"
                control={
                  <Checkbox
                    checked={check1}
                    onChange={(v) => setCheck1(v.target.checked)}
                  />
                }
                label="I acknowledge that all messages on this site are posted in good faith."
              />
              <FormControlLabel
                className="checkbox"
                control={
                  <Checkbox
                    checked={check2}
                    onChange={(v) => setCheck2(v.target.checked)}
                  />
                }
                label="This message contains truthful information."
              />
            </div>
            <Button variant="contained" onClick={addAdvice} id="adviceButton">
              Add advice
            </Button>
          </div>
        </Container>
      ) : (
        <div></div>
      )}

      {/* Footer */}

      {/* End footer */}
    </div>
  );
}
