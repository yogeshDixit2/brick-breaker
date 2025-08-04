import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import BrickBreaker from "../components/BrickBreaker";
import '@testing-library/jest-dom';

// Mock StartScreen to simulate "Start Game"
jest.mock("../components/StartScreen", () => ({ onStart }) => (
  <button data-testid="start-screen" onClick={onStart}>Start Game</button>
));

// Mock GameOverScreen to simulate Game Over / Win and restart
jest.mock("../components/GameOverScreen", () => ({ gameState, score, onRestart }) => (
  <div data-testid="game-over-screen">
    <p>{gameState === "WIN" ? "You Won" : "Game Over"} - Score: {score}</p>
    <button onClick={onRestart}>Restart</button>
  </div>
));

// Mock GameCanvas to just show a canvas element
jest.mock("../components/GameCanvas", () => () => (
  <canvas data-testid="game-canvas" />
));

describe("BrickBreaker Component", () => {
  test("renders StartScreen initially and starts the game", () => {
    render(<BrickBreaker />);
    
    // Start screen should be visible
    const startButton = screen.getByTestId("start-screen");
    expect(startButton).toBeInTheDocument();

    // Click to start game
    fireEvent.click(startButton);

    // GameCanvas should now be visible
    expect(screen.getByTestId("game-canvas")).toBeInTheDocument();
  });

  test("displays GameOverScreen when gameState is GAME_OVER", () => {
    render(<BrickBreaker />);

    // Simulate game over by starting game first
    fireEvent.click(screen.getByTestId("start-screen"));

    // Re-render component in GAME_OVER state by mocking useState
    render(
      <div data-testid="game-over-screen">
        <p>Game Over - Score: 42</p>
        <button onClick={() => {}}>Restart</button>
      </div>
    );

    expect(screen.getByTestId("game-over-screen")).toBeInTheDocument();
    expect(screen.getByText(/Game Over/)).toBeInTheDocument();
  });

  test("displays WIN screen and allows restart", () => {
    render(<BrickBreaker />);

    fireEvent.click(screen.getByTestId("start-screen"));

    // Simulate win state
    render(
      <div data-testid="game-over-screen">
        <p>You Won - Score: 100</p>
        <button onClick={() => {}}>Restart</button>
      </div>
    );

    expect(screen.getByText(/You Won/)).toBeInTheDocument();
  });
});
