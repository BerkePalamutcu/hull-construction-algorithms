export const orientation = (p, q, r) => {
  let val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
  if (val === 0) return 0; // colinear
  return val > 0 ? 1 : 2; // clock or counterclock wise
};
