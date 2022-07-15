import React, { useState } from "react";
import { Link } from "react-router-dom";
import QuizOne from "../QuizOne/QuizOne";
import QuizTwo from "../QuizTwo/QuizTwo";
import "./Home.css";

function Home() {
  const [totalScore, setTotalScore] = useState(0);
  const [startQuizOne, setStartQuizOne] = useState(false);
  const [startQuizTwo, setStartQuizTwo] = useState(false);
  const [hideButtonTwo, setHideButtonTwo] = useState(false);
  const [hideButtonOne, setHideButtonOne] = useState(false);
  function HideButtonPlayerTwo(value) {
    setHideButtonTwo(value);
  }
  function HideButtonPlayerOne(value) {
    setHideButtonOne(value);
  }
  function ShowCumulativeScore(score) {
    setTotalScore((totalScore) => totalScore + score);
    return (
      <div>
        <h2>Total Score : {totalScore}</h2>
      </div>
    );
  }
  return (
    <div className="float-container">
      <div className="float-child1">
        <h1>{!startQuizOne && "Press start to play"}</h1>
        {!hideButtonOne && (
          <button
            className="PlayerOne"
            onClick={() => {
              setStartQuizOne(true);
              HideButtonPlayerOne(true);
            }}
          >
            Start for player 1
          </button>
        )}
        {console.log(startQuizOne)}
        <QuizOne
          showQuestionProps={startQuizOne}
          setStartQuizOne={setStartQuizOne}
          HideButtonPlayerOne={HideButtonPlayerOne}
          ShowCumulativeScore={ShowCumulativeScore}
        ></QuizOne>
      </div>
      <div className="float-child2">
        <h1>{!startQuizTwo && "Press start to play"}</h1>
        {!hideButtonTwo && (
          <button
            onClick={() => {
              setStartQuizTwo(true);
              HideButtonPlayerTwo(true);
            }}
          >
            start for player two
          </button>
        )}
        <QuizTwo
          showQuestionProps={startQuizTwo}
          setStartQuizTwo={setStartQuizTwo}
          HideButtonPlayerTwo={HideButtonPlayerTwo}
          ShowCumulativeScore={ShowCumulativeScore}
        ></QuizTwo>
      </div>
      <h2>Cumulative Score : {totalScore}</h2>
    </div>
  );
}

export default Home;
