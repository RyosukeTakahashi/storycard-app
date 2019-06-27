import React, { useState, useEffect } from "react";
import { useSprings, animated, interpolate, useSpring } from "react-spring";
import { useGesture } from "react-use-gesture";
import useAxios from "axios-hooks";
import Button from "@material-ui/core/Button";

import { logicalPhrases, storyPhrases, shuffle } from "./words";
import "./App.css";

const modes = {
  logical: shuffle(logicalPhrases),
  story: shuffle(storyPhrases)
};

const to = i => ({
  x: 0,
  y: i * -8,
  scale: 1,
  rot: -15 + Math.random() * 30,
  delay: i * 100
});
const from = i => ({
  x: 0,
  rot: -15 + Math.random() * 20,
  scale: 1.5,
  y: -1000
});
// This is being used down there in the view, it interpolates rotation and scale into a css transform
const trans = (r, s) =>
  `perspective(1500px) rotateX(30deg) rotateY(${r /
    10}deg) rotateZ(${r}deg) scale(${s})`;

const defaultTime = 8;

export default function App() {
  const [isInMenu] = useState(true);
  const [mode, setMode] = useState("logical");
  const [phrases, setPhrases] = useState(modes[mode].slice(0, 10));
  const [gone] = useState(() => new Set());
  const [goneAdded, setGoneAdded] = useState(false);
  const [springProps, set] = useSprings(phrases.length, i => ({
    ...to(i),
    from: from(i)
  }));
  const [timeLeft, setTimeLeft] = useState(8);

  const [{ data, loading, error }, refetch] = useAxios(
    "http://localhost:3001/logical_phrases/"
  );

  function handleClick(id) {
    setTimeout(() => {
      gone.clear();
      set(i => from(i));
      setMode(id);
      setPhrases(shuffle(modes[mode]).slice(0, 10));
      setGoneAdded(true);
    }, 600);

    setTimeout(() => {
      set(i => to(i));
      setGoneAdded(false);
    }, 1200);
  }

  const bind = useGesture(
    ({
      args: [index],
      down,
      delta: [xDelta, yDelta],
      direction: [xDir, yDir],
      velocity
    }) => {
      const trigger = velocity > 0.2; // If you flick hard enough it should trigger the card to fly out
      const dir = xDir < 0 ? -1 : 1; // Direction should either point left or right
      if (!down && trigger) {
        gone.add(index);
        setGoneAdded(true);
        setTimeout(() => {
          setGoneAdded(false);
        }, 1000);
      } // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
      set(i => {
        if (index !== i) return; // We're only interested in changing spring-data for the current spring
        const isGone = gone.has(index);
        const x = isGone ? (100 + window.innerWidth) * xDir : down ? xDelta : 0; // When a card is gone it flys out left or right, otherwise goes back to zero
        const y = isGone
          ? (100 + window.innerHeight) * yDir
          : down
          ? yDelta
          : 0;
        const rot = xDelta / 100 + (isGone ? dir * 10 * velocity : 0); // How much the card tilts, flicking it harder makes it rotate faster

        const scale = down ? 1.05 : 1; // Active cards lift up a bit
        return {
          x,
          y,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 1000 : isGone ? 200 : 500 }
        };
      });
      if (!down && gone.size === phrases.length) {
        setTimeout(() => {
          gone.clear();
          set(i => to(i));
        }, 600);
        setGoneAdded(true);
        setTimeout(() => {
          setGoneAdded(false);
        }, 1000);
      }
    }
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;
  if (data)
    return <pre>{data.map(e => e.phrase)}</pre>;

  return (
    <div>
      <Deck
        phrases={modes[mode]}
        gone={gone}
        springProps={springProps}
        set={set}
        bind={bind}
      />
      {isInMenu && (
        <div className="buttons">
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleClick("logical")}
          >
            ロジカルモード
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleClick("story")}
          >
            ストーリーモード
          </Button>
        </div>
      )}
      <Timer
        timeLeft={timeLeft}
        goneAdded={goneAdded}
        setTimeLeft={setTimeLeft}
      />
    </div>
  );
}

function Deck({ phrases, springProps, bind }) {
  return springProps.map(({ x, y, rot, scale }, i) => (
    <animated.div
      key={i}
      style={{
        transform: interpolate([x, y], (x, y) => `translate3d(${x}px,${y}px,0)`)
      }}
      className={"card-container"}
    >
      {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
      <animated.div
        {...bind(i)}
        style={{ transform: interpolate([rot, scale], trans) }}
        className={"card"}
      >
        {phrases[i]}
      </animated.div>
    </animated.div>
  ));
}

function Timer({ timeLeft, goneAdded, setTimeLeft }) {
  useEffect(() => {
    const timerID = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    if (goneAdded) setTimeLeft(defaultTime);

    if (timeLeft <= 0) clearInterval(timerID);

    return function cleanup() {
      clearInterval(timerID);
    };
  }, [goneAdded, timeLeft]);

  const timerWidth = timeLeft > 0 ? (timeLeft - 1) * 20 : 0;
  const initialLength = (defaultTime - 1) * 20;
  const marginRight =
    initialLength - timerWidth > initialLength
      ? initialLength
      : initialLength - timerWidth;
  const timerAnimationProp = useSpring({
    to: { width: timerWidth, marginRight: marginRight },
    config: { duration: 1000 }
  });
  return (
    <div className="timer-container">
      <div className="timeString">{timeLeft}</div>
      <animated.div className="timerGauge" style={timerAnimationProp} />
    </div>
  );
}
