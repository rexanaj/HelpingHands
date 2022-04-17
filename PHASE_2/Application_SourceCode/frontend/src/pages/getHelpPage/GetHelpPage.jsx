import React, { useState } from "react";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import options from "../../components/Diseases"
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import "./GetHelpPage.css";



export default function GetHelpPage () {

  var cards = [1, 2, 3, 4, 5, 6];
  var cardTitle = ["Adam Smith", "Dr Ahmad Fawad Masomi", "Noor Hassanien", "Shoker Khan", "Dr Luo Dapeng", "Michael Baker"]
  var cardBody = ["My children all had a severe fever and my daughter developed a severe infection. We lost hope, she fell unconscious for three days and three nights. She's recovered now after being admitted to a Save the Children clinic. Stay safe everyone.", "The international community needs to segregate funding for medical and humanitarian services from politics. They need to provide immediate technical and financial support for the healthcare system in Afghanistan", "The rise of malnutrition among Afghan children is weakening their immune system to measles and also making them a lot more vulnerable to complications, like pneumonia and brain damage.", "Measles has always been something seasonal, we had some cases last year too, for example. But, in my whole life I have never seen so many cases at once, as this year", "We are seeing this epidemic of measles because there is not enough money to do vaccination campaigns or provide services for those who contract the disease.", "The rise in measles cases in Afghanistan is especially concerning because of the extremely high levels of malnutrition"]

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [advice, setAdvice] = useState('');
  const [disease, setDisease] = useState('');
  const submitDisease = () => {
    console.log("test")
    setLoading(true);
  };

  const addAdvice = async () => {
    console.log(name);
    console.log(advice)
    console.log(disease)
    const res = await fetch(`http://localhost:5555/posts/makePost`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        content: advice,
        disease: disease,
      })
    });

    const body = await res.json();
    if (body.error) {
      alert(body.error)
    } else {
      console.log("Success")
    }
  }


  return (
    <div>
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
          <Typography variant="h5" align="center" color="text.secondary" paragraph >
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
              onChange={(event, value)=>{setDisease(value)}}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Select a disease" />}
            />
            <Button id="searchButton" variant="contained" onClick={submitDisease}>Get help</Button>
          </Stack>
        </Container>
      </Box>

      {
        loading ? <Container sx={{ py: 8 }} maxWidth="md" id="gethelp-card-container">
          {/* End hero unit */}
          <h1 className="gethelp-header">Advice from our users</h1>
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {cardTitle[card - 1]}
                    </Typography>
                    <Typography>
                      {cardBody[card - 1]}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Contact</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          <h1 className="gethelp-header">Add some advice for anybody affected</h1>
          <div id="enterForm">
            <h2 className="subtitle">Enter your name</h2>
            <TextField
              className="textField"
              value={name}
              id="outlined-textarea"
              label="Username"
              placeholder="Enter your name"
              onChange={(e) => { setName(e.target.value) }}
            />
            <h2 className="subtitle">Enter some advice</h2>
            <TextField
              className="textField"
              value={advice}
              fullWidth
              id="outlined-multiline-static"
              rows={4}
              label="add some advice"
              onChange={(e) => { setAdvice(e.target.value) }}
            />
            <Button variant="contained" onClick={addAdvice} id="adviceButton">Add advice</Button>
          </div>
        </Container> : <div></div>
      }


      {/* Footer */}

      {/* End footer */}
    </div >
  );
}