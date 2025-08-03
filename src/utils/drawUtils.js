export function drawBall(ctx, ball) {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = "#FF4136"; // Red
  ctx.fill();
  ctx.closePath();
}

export function drawPaddle(ctx, paddle) {
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
  ctx.fillStyle = "#2ECC40"; // Green
  ctx.fill();
  ctx.closePath();
}

export function drawBricks(ctx, bricks, brick) {
  bricks.forEach((row) => {
    row.forEach((b) => {
      if (b.status === 1) {
        ctx.beginPath();
        ctx.rect(
          b.x,
          b.y,
          brick.width,
          brick.height
        );
        ctx.fillStyle = "#0074D9"; // Blue
        ctx.fill();
        ctx.closePath();
      }
    });
  });
}
