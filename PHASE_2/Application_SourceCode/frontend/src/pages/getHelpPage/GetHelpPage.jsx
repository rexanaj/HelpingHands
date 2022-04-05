import React, { useState } from "react";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import options from "../../components/Diseases"
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import "./GetHelpPage.css"
    


const theme = createTheme();

export default function GetHelpPage() {
    
	var cards = [1, 2, 3, 4, 5, 6];
	var cardTitle = ["Heart Foundation", "Cancer Council", "Joint United Nations Programme on HIV/AIDS", "International Society for Infectious Diseases", "United Nations Children's Fund", "World Food Programme"]
	var cardBody = ["fill1", "2", "3", "4", "5", "6"]

    const [loading, setLoading] = useState(false);
	const [name, setName] = useState('');
	const [advice, setAdvice] = useState('');
    const submitDisease = () => {
        console.log("test")
        setLoading(true);
    };

	const addAdvice = () => {
		console.log(name);
		console.log(advice)
		cards.push(cards.length + 1)
		cardTitle.push(name);
		cardBody.push(advice)
	}
	

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
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
              Contact one of these charitable organisations if you are currently struggling in your situation.
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
                    // value={disease}
                    options={options}
                    
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Select a disease" />}
                />
                <Button id="searchButton" variant="contained" onClick={submitDisease}>Get help</Button>
            </Stack>
          </Container>
        </Box>
        {loading ? <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {cardTitle[card-1]}
                    </Typography>
                    <Typography>
                      {cardBody[card-1]}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Contact</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container> : <div></div>}
	<h1 className="gethelp-header">Add some advice for anybody affected</h1>
    <div id="enterForm">
        <TextField
			value={name}
			id="outlined-textarea"
			label="Username"
			placeholder="Enter your name"
			onChange={(e)=>{setName(e.target.value)}}
        />
        <TextField
			value={advice}
			fullWidth
			id="outlined-multiline-static"
			rows={4}
			label="add some advice"
			onChange={(e)=>{setAdvice(e.target.value)}}
        />
		<Button variant="contained" onClick={addAdvice}>Add advice</Button>
    </div>
      
      {/* Footer */}
      
      {/* End footer */}
    </ThemeProvider>
  );
}