/** @jsx jsx */
import React from "react";

import { jsx, css } from "@emotion/core";

import Button from "@material-ui/core/Button";

const phrases = [
  "偶然にも",
  "そもそも",
  "そういうわけで",
  "もし",
  "そして",
  "いつのまにか",
  "残念ながら",
  "いつか",
  "いいかえると"
];

function Header() {
  return (
    <header>
      <h1
        css={css`
          margin-left: 5vw;
        `}
      >
        StoryCard
      </h1>
    </header>
  );
}

const PhraseSection = props => {
  return (
    <div
      css={css`
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;

        height: 100vh;
        display: flex;
        justify-content: center;
        flex-direction: column;
        text-align: center;
        font-size: 3em;
      `}
    >
      {props.phrase}
    </div>
  );
};

const EmotionButton = props => {
  return (
    <div
      css={css`
        position: relative;
        top: 70vh;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: center;
      `}
    >
      <Button variant="contained" color="primary">
        次のカード
      </Button>
    </div>
  );
};

function App() {
  const phrase = phrases[Math.floor(Math.random() * phrases.length)];



  return (
    <div className="App">
      <Header />
      <PhraseSection phrase={phrase} />
      <EmotionButton />
    </div>
  );
}

export default App;
