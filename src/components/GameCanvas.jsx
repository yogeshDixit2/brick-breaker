import React, { useRef, useEffect } from "react";
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  ROW_COUNT,
  COL_COUNT,
  PADDING,
  OFFSET_TOP,
  OFFSET_LEFT,
  BRICK_WIDTH,
  BRICK_HEIGHT,
  PADDLE_WIDTH,
  PADDLE_HEIGHT,
  BALL_RADIUS,
} from "../constants/GameConfig";

const GameCanvas = ({
  gameState,
  setGameState,
  score,
  setScore,
  lives,
  setLives,
  paddle,
  ball,
  bricksRef,
  resetGame,
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    let animationId;

    // Polyfill roundRect
    if (!ctx.roundRect) {
      ctx.roundRect = function (x, y, width, height, radius) {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
      };
    }

    const draw = () => {
      // Dark background
      ctx.fillStyle = "#111";
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // Bricks
      bricksRef.current.forEach((col, c) => {
        col.forEach((brick, r) => {
          if (brick.status) {
            const x = OFFSET_LEFT + c * (BRICK_WIDTH + PADDING);
            const y = OFFSET_TOP + r * (BRICK_HEIGHT + PADDING);
            brick.x = x;
            brick.y = y;

            const brickGradient = ctx.createLinearGradient(x, y, x, y + BRICK_HEIGHT);
            brickGradient.addColorStop(0, "#3B82F6");
            brickGradient.addColorStop(1, "#2563EB");
            ctx.fillStyle = brickGradient;
            ctx.beginPath();
            ctx.roundRect(x, y, BRICK_WIDTH, BRICK_HEIGHT, 4);
            ctx.fill();
            ctx.strokeStyle = "#e0e7ff";
            ctx.stroke();
          }
        });
      });

      // Ball
      const ballGradient = ctx.createRadialGradient(
        ball.current.x,
        ball.current.y,
        BALL_RADIUS / 2,
        ball.current.x,
        ball.current.y,
        BALL_RADIUS
      );
      ballGradient.addColorStop(0, "#f87171");
      ballGradient.addColorStop(1, "#b91c1c");
      ctx.fillStyle = ballGradient;
      ctx.shadowColor = "#f87171";
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(ball.current.x, ball.current.y, BALL_RADIUS, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Paddle
      ctx.fillStyle = "#10B981";
      ctx.shadowColor = "#10B981";
      ctx.shadowBlur = 15;
      ctx.fillRect(
        paddle.current.x,
        CANVAS_HEIGHT - PADDLE_HEIGHT - 10,
        PADDLE_WIDTH,
        PADDLE_HEIGHT
      );
      ctx.shadowBlur = 0;

      // Score & Lives
      ctx.font = "18px 'Press Start 2P', cursive";
      ctx.fillStyle = "#e5e7eb";
      ctx.fillText(`Score: ${score}`, 8, 20);
      ctx.fillText(`Lives: ${lives}`, CANVAS_WIDTH - 140, 20);

      // Brick collision
      for (let c = 0; c < COL_COUNT; c++) {
        for (let r = 0; r < ROW_COUNT; r++) {
          const b = bricksRef.current[c][r];
          if (b.status === 1) {
            if (
              ball.current.x > b.x &&
              ball.current.x < b.x + BRICK_WIDTH &&
              ball.current.y > b.y &&
              ball.current.y < b.y + BRICK_HEIGHT
            ) {
              ball.current.dy = -ball.current.dy;
              b.status = 0;
              const newScore = score + 1;
              setScore(newScore);
              if (newScore === ROW_COUNT * COL_COUNT) {
                setGameState("WIN");
              }
            }
          }
        }
      }

      // Walls & paddle collision
      if (
        ball.current.x + ball.current.dx > CANVAS_WIDTH - BALL_RADIUS ||
        ball.current.x + ball.current.dx < BALL_RADIUS
      )
        ball.current.dx = -ball.current.dx;

      if (ball.current.y + ball.current.dy < BALL_RADIUS) {
        ball.current.dy = -ball.current.dy;
      } else if (
        ball.current.y + ball.current.dy >
        CANVAS_HEIGHT - BALL_RADIUS
      ) {
        if (
          ball.current.x > paddle.current.x &&
          ball.current.x < paddle.current.x + PADDLE_WIDTH
        ) {
          ball.current.dy = -ball.current.dy;
        } else {
          const remainingLives = lives - 1;
          setLives(remainingLives);
          if (remainingLives === 0) {
            setGameState("GAME_OVER");
          } else {
            ball.current.x = CANVAS_WIDTH / 2;
            ball.current.y = CANVAS_HEIGHT - PADDLE_HEIGHT - BALL_RADIUS - 10;
            ball.current.dx = 4;
            ball.current.dy = -4;
            paddle.current.x = (CANVAS_WIDTH - PADDLE_WIDTH) / 2;
          }
        }
      }

      ball.current.x += ball.current.dx;
      ball.current.y += ball.current.dy;

      if (gameState === "PLAYING") {
        animationId = requestAnimationFrame(draw);
      }
    };

    if (gameState === "PLAYING") {
      draw();
    }
    return () => cancelAnimationFrame(animationId);
  }, [gameState, score, lives]);

  useEffect(() => {
    const handleMouse = (e) => {
      const rect = canvasRef.current.getBoundingClientRect();
      const pos = e.clientX - rect.left;
      if (pos > 0 && pos < CANVAS_WIDTH) {
        paddle.current.x = pos - PADDLE_WIDTH / 2;
      }
    };
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") paddle.current.x -= 20;
      else if (e.key === "ArrowRight") paddle.current.x += 20;
      else if (e.key === " " && gameState !== "PLAYING") {
        resetGame();
        setGameState("PLAYING");
      }
    };
    window.addEventListener("mousemove", handleMouse);
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("keydown", handleKey);
    };
  }, [gameState]);

  return (
    <canvas
      ref={canvasRef}
      width={CANVAS_WIDTH}
      height={CANVAS_HEIGHT}
      className="rounded-lg shadow-2xl border-2 border-gray-700 bg-black"
    />
  );
};

export default GameCanvas;
