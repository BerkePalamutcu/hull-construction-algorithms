// Helper function to get the square of the distance between two points
const sqrDist = (a, b) => {
  console.log(
    `distance is calculated between two points: point ${a} and point ${b}`
  );
  return (b.x - a.x) ** 2 + (b.y - a.y) ** 2;
};

// Function to get the orientation of ordered triplet (p, q, r)
// The function returns following values
// 0 --> p, q and r are colinear
// 1 --> Clockwise
// 2 --> Counterclockwise
const orientation = (p, q, r) => {
  console.log('checking the orientation');
  let val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
  if (val === 0) return 0; // colinear
  return val > 0 ? 1 : 2; // clock or counterclock wise
};

// Main function that returns the convex hull of a set of points
export const grahamScan = (points) => {
  let n = points.length;
  if (n < 3) return [];

  // Find the bottommost point
  console.log('find the most bottom point');
  let l = 0;
  for (let i = 1; i < n; i++)
    if (
      points[i].y < points[l].y ||
      (points[i].y === points[l].y && points[i].x < points[l].x)
    )
      l = i;

  // Place the bottom-most point at first position
  [points[0], points[l]] = [points[l], points[0]];

  console.log('swap the most bottom point as starting point');
  // Sort n-1 points with respect to the first point.
  // A point p1 comes before p2 in sorted output if p2
  // has larger polar angle (in counterclockwise direction) than p1
  points.sort((p1, p2) => {
    let o = orientation(points[0], p1, p2);
    if (o === 0)
      return sqrDist(points[0], p2) >= sqrDist(points[0], p1) ? -1 : 1;
    return o === 2 ? -1 : 1;
  });
  console.log('depending on the orientation sort all the points');
  // Create an empty stack and push first three points to it.

  console.log(
    'create an empty stack and push first three points into the stack'
  );
  let stack = [];
  stack.push(points[0], points[1], points[2]);
  console.log('current state of the stack ', stack);
  // Process remaining n-3 points

  for (let i = 3; i < n; i++) {
    console.log(
      'Keep removing top while the angle formed by points next-to-top, top, and points[i] makes a non-left turn'
    );
    // Keep removing top while the angle formed by points next-to-top, top, and points[i] makes a non-left turn
    while (
      stack.length > 1 &&
      orientation(
        stack[stack.length - 2],
        stack[stack.length - 1],
        points[i]
      ) !== 2
    ) {
      console.log('popping from the stack');
      stack.pop();
    }
    console.log(`pushing point ${points[i]} to the stack`);
    stack.push(points[i]);
  }

  return stack;
};
