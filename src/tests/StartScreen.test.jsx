import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import StartScreen from "../components/StartScreen";
import '@testing-library/jest-dom';

describe("StartScreen", () => {
  it("renders title and Play button", () => {
    render(<StartScreen onStart={jest.fn()} />);
    expect(screen.getByText("Brick Breaker")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /play/i })).toBeInTheDocument();
  });

  it("calls onStart when Play button is clicked", () => {
    const onStartMock = jest.fn();
    render(<StartScreen onStart={onStartMock} />);
    fireEvent.click(screen.getByRole("button", { name: /play/i }));
    expect(onStartMock).toHaveBeenCalledTimes(1);
  });
});
