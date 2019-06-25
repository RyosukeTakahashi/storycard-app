/** @jsx jsx */
import React, {useCallback, useState} from 'react';
import {jsx, css} from '@emotion/core';
import {CSSTransition, Transition} from 'react-transition-group';

import Button from '@material-ui/core/Button';

const phrases = [
  '偶然にも',
  'そもそも',
  'そういうわけで',
  'もし',
  'そして',
  'いつのまにか',
  '残念ながら',
  'いつか',
  'いいかえると',
];

//todo カード画像？要素？
//todo 文字移動？
//todo 山札の画像とHTML

//todo ログをRailsに残せる
//todo 語群ををRailsから取れる

function Header() {
  const [animating, setIsAnimating] = useState(false);

  const startAnimate = useCallback(() => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  }, []);

  return (
    <div
      onClick={startAnimate}
      css={css`
        position: relative;
        z-index: 100;
      `}
    >
      <Transition timeout={500} in={animating}>
        {state => (
          <header
            css={css`
              transition: 0.5s;
              transform: translateX(
                ${state === 'entering' || state === 'entered' ? 400 : 0}px
              );
              margin-left: 5vw;
            `}
          >
            <h1>Story card</h1>
          </header>
        )}
      </Transition>

      {/*<header>*/}
      {/*  <h1*/}
      {/*    css={css`*/}
      {/*      margin-left: 5vw;*/}
      {/*    `}*/}
      {/*  >*/}
      {/*    StoryCard*/}
      {/*  </h1>*/}
      {/*</header>*/}
    </div>
  );
}

const PhraseSection = ({phrase, animating}) => {
  return (
    <Transition timeout={500} in={animating} >
      {state => {

        const position = () => {
          switch (state) {
            case 'entering':
              return '-40vh';
            case 'entered':
              return '-40vh';
            case 'exiting':
              return '0';
            case 'exited':
              return '0';
          }
        };

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
          z-index: 0;
          
          transition: 300ms ease-out;
          transform: translateX(${position()});
                      
        `}
          >
            <p>{phrase}</p>
          </div>
        );
      }
      }
    </Transition>
    //transform: translateX(${
    //   state === "entering" || state === "entered" ? "-40vw" : 0
    // });

    // transform: translateX(${(state) => {
    //   console.log(state);
    //   switch (state.status) {
    //     case 'entering':
    //       return '-40vw';
    //     case 'entered':
    //       return '-40vw';
    //     case 'exiting':
    //       return '-30vw';
    //     case 'exited':
    //       return '-20vw';
    //   }
    // }};
    // );

  );
};

const EmotionButton = ({onButtonClick}) => {
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
      <Button variant="contained" color="primary" onClick={onButtonClick}>
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

  const [animating, setIsAnimating] = useState(false);

  const startAnimate = useCallback(() => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  }, []);

  function handleClick() {
    startAnimate();

    // const newPhrase = getRandomPhrase();
    // setPhrase(newPhrase);
    // addToPhraseLog(phraseLog.concat([newPhrase]));

    //
  }

  return (
    <div className="App">
      <Header/>
      <PhraseSection phrase={phrase} animating={animating}/>
      <EmotionButton onButtonClick={handleClick}/>
      {/*<PhraseLog usedPhrases={phraseLog}/>*/}
    </div>
  );
}

export default App;
