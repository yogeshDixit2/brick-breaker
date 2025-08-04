import React from "react";
import { render } from "@testing-library/react";
import GameCanvas from "../components/GameCanvas";
import '@testing-library/jest-dom';

beforeEach(() => {
  HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
    roundRect: jest.fn(),
    beginPath: jest.fn(),
    moveTo: jest.fn(),
    lineTo: jest.fn(),
    arc: jest.fn(),
    fill: jest.fn(),
    stroke: jest.fn(),
    closePath: jest.fn(),
    clearRect: jest.fn(),
    fillStyle: '',
    strokeStyle: '',
    lineWidth: 0,
    font: '',
    fillText: jest.fn(),
  }));
});

describe("GameCanvas", () => {
  it("renders canvas element", () => {
    const dummyBricks = Array.from({ length: 5 }, () =>
      Array.from({ length: 3 }, () => ({
        x: 0,
        y: 0,
        status: 1,
      }))
    );

    const props = {
      isGameStarted: true,
      setGameStarted: jest.fn(),
      onGameOver: jest.fn(),
      onGameWon: jest.fn(),
      paddleX: 100,
      score: 0,
      lives: 3,
      bricksRef: { current: dummyBricks },
    };

    const { container } = render(<GameCanvas {...props} />);
    const canvas = container.querySelector("canvas");
    expect(canvas).toBeInTheDocument();
  });
});
