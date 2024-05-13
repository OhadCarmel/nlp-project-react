import React, { useState, component } from "react";
import {
  Typography,
  Button,
  Container,
  Switch,
  FormControlLabel,
} from "@mui/material";
import ExperimentScreen from "../ExperimentScreen/ExperimentScreen";

function WelcomePage({ handleStart, handleWordByWord, wordByWord }) {
  return (
    <Container component="main" maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Welcome to the Experiment
      </Typography>
      <Typography variant="body1" paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.
        Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies
        sed, dolor. Cras elementum ultrices diam.
      </Typography>
      <FormControlLabel
        control={
          <Switch
            checked={wordByWord}
            onChange={(event) => handleWordByWord(event.target.checked)}
            name="wordByWordSwitch"
            color="primary"
          />
        }
        label="Display Description Word by Word"
      />
      <Button variant="contained" color="primary" onClick={handleStart}>
        Start
      </Button>
    </Container>
  );
}

export default WelcomePage;
