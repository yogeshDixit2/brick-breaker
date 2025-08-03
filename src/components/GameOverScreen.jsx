import React from "react";

function GameOverScreen({ score, onRestart }) {
  return (
    <div className="game-over-screen">
      <h2>Game Over</h2>
      <p>Your score: {score}</p>
      <button className="restart-button" onClick={onRestart}>Restart</button>
    </div>
  );
}

export default GameOverScreen;
