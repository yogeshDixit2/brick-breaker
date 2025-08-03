import React from "react";


function StartScreen({ onStart }) {
  return (
    <div className="start-screen">
      <h1 className="title">Brick Breaker</h1>
      <button className="start-button" onClick={onStart}>Play</button>
    </div>
  );
}

export default StartScreen;
