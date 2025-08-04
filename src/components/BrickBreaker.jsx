import React, { useRef, useState, useEffect } from "react";
import GameCanvas from "./GameCanvas";
import StartScreen from "./StartScreen";
import GameOverScreen from "./GameOverScreen";
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  ROW_COUNT,
  COL_COUNT,
  PADDLE_WIDTH,
  PADDLE_HEIGHT,
  BALL_RADIUS,
} from "../constants/GameConfig";

const BrickBreaker = () => {
  const [gameState, setGameState] = useState("START");
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(2);

  const paddle = useRef({ x: (CANVAS_WIDTH - PADDLE_WIDTH) / 2 });
  const ball = useRef({
    x: CANVAS_WIDTH / 2,
    y: CANVAS_HEIGHT - PADDLE_HEIGHT - BALL_RADIUS - 10,
    dx: 4,
    dy: -4,
  });
  const bricksRef = useRef([]);

  const initBricks = () => {
    const bricks = [];
    for (let c = 0; c < COL_COUNT; c++) {
      bricks[c] = [];
      for (let r = 0; r < ROW_COUNT; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
      }
    }
    bricksRef.current = bricks;
  };

  const resetGame = () => {
    initBricks();
    setScore(0);
    setLives(2);
    ball.current = {
      x: CANVAS_WIDTH / 2,
      y: CANVAS_HEIGHT - PADDLE_HEIGHT - BALL_RADIUS - 10,
      dx: 4,
      dy: -4,
    };
    paddle.current.x = (CANVAS_WIDTH - PADDLE_WIDTH) / 2;
  };

  useEffect(() => {
    initBricks();
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center p-4 min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black">
      {gameState === "START" && (
        <StartScreen onStart={() => setGameState("PLAYING")} />
      )}
      {gameState === "GAME_OVER" && (
        <GameOverScreen
          gameState={gameState}
          score={score}
          onRestart={() => {
            resetGame();
            setGameState("PLAYING");
          }}
        />
      )}
      {gameState === "WIN" && (
        <GameOverScreen
          gameState={gameState}
          score={score}
          onRestart={() => {
            resetGame();
            setGameState("PLAYING");
          }}
        />
      )}
      {gameState === "PLAYING" && (
        <GameCanvas
          gameState={gameState}
          setGameState={setGameState}
          score={score}
          setScore={setScore}
          lives={lives}
          setLives={setLives}
          paddle={paddle}
          ball={ball}
          bricksRef={bricksRef}
          resetGame={resetGame}
        />
      )}
    </div>
  );
};

export default BrickBreaker;