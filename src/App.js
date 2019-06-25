/** @jsx jsx */
import React, { useState } from "react";

import { jsx, css, keyframes } from "@emotion/core";

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

//todo カード画像？要素？
//todo 文字移動？
//todo 山札の画像とHTML

//todo ログをRailsに残せる
//todo 語群ををRailsから取れる

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

// const bounce = keyframes`
//   from, 20%, 53%, 80%, to {
//     transform: translate3d(0,0,0);
//   }
//
//   40%, 43% {
//     transform: translate3d(-30px, -30px, 0);
//   }
//
//   70% {
//     transform: translate3d(-15px, -15px, 0);
//   }
//
//   90% {
//     transform: translate3d(-4px,-4px,0);
//   }
// `;

const slideLeft = keyframes`
  0% {
    transform: translate3d(0, 0, 0);
  }

  100% {
    transform: translate3d(-60vh, 0, 0);
  }
`;


const PhraseSection = ({ phrase }) => {
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
      <p
        css={css`
          animation: ${slideLeft} 1s ease;
        `}
      >
        {phrase}
      </p>
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
      <Button variant="contained" color="primary" onClick={props.onButtonClick}>
        次のカード
      </Button>
    </div>
  );
};

// const PhraseLog = ({ usedPhrases }) => {
//   return <div>{usedPhrases.slice(0, usedPhrases.length - 1).join(",")}</div>;
// };

function App() {
  const getRandomPhrase = () => {
    return phrases[Math.floor(Math.random() * phrases.length)];
  };

  const initialPhrase = getRandomPhrase();
  const [phrase, setPhrase] = useState(initialPhrase);
  const [phraseLog, addToPhraseLog] = useState([initialPhrase]);

  function handleClick() {
    const newPhrase = getRandomPhrase();
    setPhrase(newPhrase);
    addToPhraseLog(phraseLog.concat([newPhrase]));
  }

  return (
    <div className="App">
      <Header />
      <PhraseSection phrase={phrase} />
      <EmotionButton onButtonClick={handleClick} />
      {/*<PhraseLog usedPhrases={phraseLog}/>*/}
    </div>
  );
}

export default App;
