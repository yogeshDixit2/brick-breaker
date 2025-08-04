import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import GameOverScreen from "../components/GameOverScreen";
import '@testing-library/jest-dom';

describe("GameOverScreen", () => {
  it("shows Game Over message when state is GAME_OVER", () => {
    render(<GameOverScreen gameState="GAME_OVER" score={10} onRestart={jest.fn()} />);
    expect(screen.getByText(/game over/i)).toBeInTheDocument();
    expect(screen.getByText(/your score: 10/i)).toBeInTheDocument();
  });

  it("shows Win message when state is WIN", () => {
    render(<GameOverScreen gameState="WIN" score={20} onRestart={jest.fn()} />);
    expect(screen.getByText(/you won/i)).toBeInTheDocument();
    expect(screen.getByText(/your score: 20/i)).toBeInTheDocument();
  });

  it("calls onRestart when Restart button is clicked", () => {
    const onRestartMock = jest.fn();
    render(<GameOverScreen gameState="GAME_OVER" score={0} onRestart={onRestartMock} />);
    fireEvent.click(screen.getByRole("button", { name: /restart/i }));
    expect(onRestartMock).toHaveBeenCalledTimes(1);
  });
});
