import React, { useState } from "react";
import WelcomePage from "./components/WelcomePage/WelcomePage";
import ExperimentScreen from "./components/ExperimentScreen/ExperimentScreen";
import db from "./Data/db";
import { Switch, FormControlLabel } from "@mui/material";

function App() {
  const [startExperiment, setStartExperiment] = useState(false);
  const [wordByWord, setWordByWord] = useState(false);
  const [dbIndex, setDbIndex] = useState(0);
  const [displayTextWordByWord, setDisplayTextWordByWord] = useState(false);

  function handleStart() {
    setStartExperiment(true);
  }

  function renderNewExperiment() {
    setDbIndex((prevIndex) => prevIndex + 1);
    console.log("Start Experiment");
  }


  return !startExperiment ? (
      <WelcomePage handleStart={handleStart} handleWordByWord={setWordByWord} wordByWord={wordByWord}/>
  ) : (
    <ExperimentScreen
      firstProbe={db[dbIndex].probes[0]}
      secondProbe={db[dbIndex].probes[1]}
      description={db[dbIndex].description}
      imgLink={db[dbIndex].image_link}
      renderNewExperiment={renderNewExperiment}
      logits={db[dbIndex].logits}
      wordByWord={wordByWord}
    />
  );
}

export default App;
