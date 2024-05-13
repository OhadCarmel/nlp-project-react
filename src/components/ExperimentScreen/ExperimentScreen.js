import React, { useState, useEffect } from "react";
import {
  Typography,
  Container,
  ButtonGroup,
  Button,
  Slider,
  Box,
} from "@mui/material";
import db from "../../Data/db";
import ImgSumScreen from "../ImgSumScreen.js/ImgSumScreen";

function ExperimentScreen({
  firstProbe,
  secondProbe,
  description,
  imgLink,
  renderNewExperiment,
  logits,
  wordByWord,
}) {
  const [selectedAnswer, setSelectedAnswer] = useState(undefined);
  const [value, setValue] = useState(0);
  const [index, setIndex] = useState(0);
  const [points, setPoints] = useState(0);
  const [shouldShowImage, setShouldShowImage] = useState(false);
  const [shouldShowProbe, setShouldShowProbe] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const words = description.split(" "); // Split the description into words

  const [startTime, setStartTime] = useState(null);

  // State for managing probes and answers
  const [probesAndAnswers, setProbesAndAnswers] = useState([
    {
      probe: firstProbe.probe,
      selectedAnswer: undefined,
      isCorrect: undefined,
      time: undefined,
      gainedPoints: undefined,
      label: firstProbe.label,
    },
    {
      probe: undefined,
      selectedAnswer: undefined,
      isCorrect: undefined,
      time: undefined,
      gainedPoints: undefined,
      label: secondProbe.label,
    },
  ]);

  const initNewExperiment = () => {
    setValue(0);
    setIndex(0);
    // setPoints(0);
    setShouldShowImage(false);
    setShouldShowProbe(false);
    renderNewExperiment();
    setDisplayedText("");
  };

  // Effect to update probesAndAnswers when firstProbe or secondProbe changes
  useEffect(() => {
    setProbesAndAnswers([
      {
        ...probesAndAnswers[0],
        probe: firstProbe ? firstProbe.probe : undefined,
      },
      {
        ...probesAndAnswers[1],
        probe: secondProbe ? secondProbe.probe : undefined,
      },
    ]);
  }, [firstProbe, secondProbe]);
  console.log(description);
  useEffect(() => {
    if (words.length === 0) return;
    if (wordByWord) {
      const timeouts = [];
      let cumulativeDelay = 0; // Initialize cumulative delay

      words.forEach((word, index) => {
        const delay = Math.random() * (200 - 10) + 10; // Generate random delay between 10ms and 100ms
        cumulativeDelay += delay; // Accumulate delays to stagger the display of each word

        let timeout = setTimeout(() => {
          setDisplayedText((prev) => prev + word + " "); // Add word and space
        }, cumulativeDelay); // Use cumulative delay to ensure words appear one after another
        timeouts.push(timeout);
      });

      return () => timeouts.forEach(clearTimeout);
    } // Cleanup timeouts on component unmount
    else {
      setDisplayedText(description);
    }
  }, [description, wordByWord]); // Only re-run the effect if description changes

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const calculatePoints = (probe) => {
    return selectedAnswer === probe.label ? value : -value;
  };

  const handleSubmit = (probe) => {
    const currentTime = Date.now();
    const timeTaken = currentTime - startTime;
    const updatedProbesAndAnswers = [...probesAndAnswers];
    updatedProbesAndAnswers[index] = {
      ...updatedProbesAndAnswers[index],
      probe: db[0].probes[index].probe,
      selectedAnswer,
      isCorrect: selectedAnswer === db[0].probes[index].label,
      time: timeTaken / 1000,
      gainedPoints: calculatePoints(probe),
    };

    setProbesAndAnswers(updatedProbesAndAnswers);
    setSelectedAnswer(undefined);
    setPoints(points + calculatePoints(probe));
    setIndex(index + 1);
    setShouldShowImage(index > 0 ? !shouldShowImage : shouldShowImage);
    setValue(0);
    setStartTime(Date.now());
  };

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    setValue(0);
  };

  const renderScale = () => (
    <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
      <Slider
        sx={{ width: "80%" }}
        value={value}
        onChange={handleSliderChange}
        aria-labelledby="input-slider"
        valueLabelDisplay="auto"
        min={0}
        max={100}
      />
      <Button
        sx={{ ml: 2 }}
        variant="contained"
        color="primary"
        onClick={() => handleSubmit(probesAndAnswers[index])}
      >
        Send
      </Button>
    </Box>
  );

  const renderExperiment = () => (
    <Container
      component="main"
      maxWidth="sm"
      sx={{ mt: 4, textAlign: "center" }}
    >
      <Typography
        variant="h6"
        sx={{
          textAlign: "left",
          mt: 2,
          color: points === 0 ? "black" : points < 0 ? "red" : "green",
        }}
      >
        Points: {points}
      </Typography>
      <Typography
        variant="body1"
        gutterBottom
        sx={{
          textAlign: "center",
          border: "1px solid black",
          padding: "8px",
          margin: "10px 0",
        }}
      >
        {displayedText}
      </Typography>
      {shouldShowProbe && (
        <Box>
          <Typography
            variant="body1"
            gutterBottom
            sx={{
              textAlign: "center",
              border: "1px solid black",
              padding: "8px",
              margin: "10px 0",
            }}
          >
            {probesAndAnswers[index].probe}
          </Typography>

          <ButtonGroup
            variant="contained"
            aria-label="outlined primary button group"
          >
            <Button
              sx={{ fontWeight: selectedAnswer === true ? "bold" : "normal" }}
              onClick={() => handleAnswer(true)}
            >
              True
            </Button>
            <Button
              sx={{ fontWeight: selectedAnswer === false ? "bold" : "normal" }}
              onClick={() => handleAnswer(false)}
            >
              False
            </Button>
          </ButtonGroup>
        </Box>
      )}
      {!shouldShowProbe && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setShouldShowProbe((prev) => !prev);
            setStartTime(Date.now());
          }}
        >
          Show me the probe!
        </Button>
      )}
      {selectedAnswer !== undefined && renderScale()}
    </Container>
  );
  // console.log(probesAndAnswers);
  return !shouldShowImage ? (
    renderExperiment()
  ) : (
    <ImgSumScreen
      probesAndAnswers={probesAndAnswers}
      imgLink={imgLink}
      totalPoints={points}
      renderNewExperiment={initNewExperiment}
    />
  );
}

export default ExperimentScreen;
