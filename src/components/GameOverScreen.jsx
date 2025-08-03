import React from "react";

function GameOverScreen({ gameState,score, onRestart }) {
    const message = gameState === "WIN" ? "🎉 You Won! 🎉" : "💥 Game Over 💥";
  return (
    <div className="game-over-screen">
        <h1 className="text-4xl font-bold text-white mb-6">{message}</h1>
      {/* <h2>Game Over</h2> */}
      <p>Your score: {score}</p>
      <button className="restart-button" onClick={onRestart}>Restart</button>
    </div>
  );
}

export default GameOverScreen;







  


