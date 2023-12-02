export const drawHull = (ctx, hull, SCALE) => {
  if (hull.length < 3) return;

  ctx.beginPath();
  ctx.moveTo(hull[0].x * SCALE, -1 * hull[0].y * SCALE);
  for (let i = 1; i < hull.length; i++) {
    ctx.lineTo(hull[i].x * SCALE, -1 * hull[i].y * SCALE);
  }
  ctx.closePath();
  ctx.strokeStyle = 'red';
  ctx.lineWidth = 2;
  ctx.stroke();
};
